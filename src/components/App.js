import {useEffect, useState} from "react";
import TemperatureChart from "./TemperatureChart";
import Papa from 'papaparse'

// Constants for weather data
const WEATHER_URL = `https://archive-api.open-meteo.com/v1/archive`;
const DEFAULT_LOCATION = {lat: '51.5085', lng: '-0.1257'};
const DEFAULT_DATE_RANGE = {start: '2023-11-01', end: '2024-03-10'};
const PARAMETERS = ['temperature_2m_max', 'temperature_2m_min']

// Fetch weather data from the API
async function fetchWeatherData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return calculateAverageTemp(data.daily.temperature_2m_min, data.daily.temperature_2m_max)
  } catch (error) {
    throw new Error(`Error fetching temperature data: ${error.message}`);
  }
}

function calculateAverageTemp(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    throw new Error("Arrays must have the same length");
  }
  const averages = [];
  for (let i = 0; i < arr1.length; i++) {
    const average = (arr1[i] + arr2[i]) / 2;
    averages.push(average);
  }
  return averages;
}

function generateDailyDates(startDate, endDate) {
  const currentDate = new Date(startDate);
  const dateArray = [];
  const endDateObj = new Date(endDate);

  while (currentDate <= endDateObj) {
    const formattedDate = currentDate.toLocaleString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'short'
    });

    dateArray.push(formattedDate);

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateArray;
}

function generateHourlyDates(startDate, endDate) {
  const currentDate = new Date(startDate);
  const dateArray = [];

  while (currentDate <= new Date(endDate)) {
    dateArray.push(currentDate.toLocaleString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: 'numeric'
    }));

    currentDate.setHours(currentDate.getHours() + 1);
  }

  return dateArray;
}

// Construct the weather API URL
function constructWeatherAPIUrl(location, dateRange) {
  const {lat, lng} = location;
  const {start, end} = dateRange;
  return `${WEATHER_URL}?latitude=${lat}&longitude=${lng}&start_date=${start}&end_date=${end}&daily=${PARAMETERS[0]},${PARAMETERS[1]}&timezone=GMT`;
}

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [temperatures, setTemperatures] = useState([])
  const [energyData, setEnergyData] = useState([]);
  let chartData;

  // Function to handle CSV file upload
  const handleFileUpload = (event) => {
    const files = event.target.files;
    let combinedData = [];

    for (let i = 0; i < files.length; i++) {
      Papa.parse(files[i], {
        header: true,
        skipEmptyLines: true,
        complete: result => {
          // Combine electricity and gas consumption data, summing them up
          const parsedData = result.data.map(entry => {
            const electricityConsumption = parseFloat(entry["Electricity consumption (kWh)"]) || 0;
            const gasConsumption = parseFloat(entry["Gas consumption (kWh)"]) || 0;
            return Math.round(electricityConsumption + gasConsumption)
          });

          combinedData = combinedData.concat(parsedData);

          // Check if all files are parsed before setting the state
          if (i === files.length - 1) {
            setEnergyData(combinedData);
          }

        }
      });
    }
  }

  if (energyData && temperatures.length > 0) {
    chartData = generateDailyDates(DEFAULT_DATE_RANGE.start, DEFAULT_DATE_RANGE.end)
      .map((day, index) => ({
        name: day,
        temperature: temperatures[index],
        energy: energyData[index]
      }));
  } else if (temperatures.length > 0) {
    chartData = generateHourlyDates(DEFAULT_DATE_RANGE.start, DEFAULT_DATE_RANGE.end)
      .map((day, index) => ({name: day, value: temperatures[index]}));
  } else {
    chartData = [];
  }


  useEffect(() => {
    setIsLoading(true);
    fetchWeatherData(constructWeatherAPIUrl(DEFAULT_LOCATION, DEFAULT_DATE_RANGE))
      .then(data => setTemperatures(data))
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      {
        isLoading ?
          <p>Loading...</p> :
          <>
            <input multiple={true} type="file" accept=".csv" onChange={handleFileUpload}/>
            <TemperatureChart data={chartData} energyData={energyData}/>
          </>
      }
    </div>
  )
}

export default App;