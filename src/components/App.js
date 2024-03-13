import {useEffect, useState} from "react";
import Graph from "./Graph";
import Papa from 'papaparse'
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import FileImport from "./FileImport";

// Constants for weather data
const WEATHER_URL = `https://archive-api.open-meteo.com/v1/archive`;
const DEFAULT_LOCATION = {lat: '51.5085', lng: '-0.1257'};
const DEFAULT_DATE_RANGE = {start: '2023-11-01', end: new Date().toISOString().slice(0, 10)}
const PARAMETERS = ['temperature_2m_max', 'temperature_2m_min']

function constructWeatherAPIUrl(location, dateRange) {
  const {lat, lng} = location;
  const {start, end} = dateRange;
  return `${WEATHER_URL}?latitude=${lat}&longitude=${lng}&start_date=${start}&end_date=${end}&daily=${PARAMETERS[0]},${PARAMETERS[1]}&timezone=GMT`;
}

function calculateAverage(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    throw new Error("Arrays must have the same length");
  }
  return arr1.map((value, index) => (value + arr2[index]) / 2);
}

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [temperatures, setTemperatures] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [energyType, setEnergyType] = useState('both');

  function handleFileUpload(event) {
    const files = event.target.files;
    const promises = [];

    for (let i = 0; i < files.length; i++) {
      promises.push(processFile(files[i]));
    }

    async function processFile(file) {
      return new Promise((resolve, reject) => {
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: result => {
            setCombinedData(prevData => prevData.concat(result.data));
            resolve();
          },
          error: reject
        });
      });
    }

    Promise.all(promises)
      .catch(error => {
        console.error("Error parsing file:", error);
      });
  }

  function handleOnEnergySet(energyType) {
    setEnergyType(energyType);
  }

  const energyData = combinedData.map(data => {
    switch (energyType) {
      case 'electricity':
        return parseFloat(data["Electricity consumption (kWh)"]) || 0;
      case 'gas':
        return parseFloat(data["Gas consumption (kWh)"]) || 0;
      default:
        return (parseFloat(data["Electricity consumption (kWh)"]) || 0) +
          (parseFloat(data["Gas consumption (kWh)"]) || 0);
    }
  });

  useEffect(() => {
    async function fetchWeatherData() {
      try {
        setIsLoading(true);
        setError('');
        const url = constructWeatherAPIUrl(DEFAULT_LOCATION, DEFAULT_DATE_RANGE)
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        const averageTemperatures = calculateAverage(data.daily.temperature_2m_min, data.daily.temperature_2m_max);
        setTemperatures(averageTemperatures);
        setError('');
      } catch (error) {
        setError(error.message || 'An error occurred while fetching weather data');
      } finally {
        setIsLoading(false);
      }
    }

    fetchWeatherData();
  }, []);

  return (
    <div>
      {isLoading && <Loader/>}
      {error && <ErrorMessage message={error}/>}
      {!isLoading && !error &&
        <>
          <FileImport handleFileUpload={handleFileUpload}/>
          <Graph temperatures={temperatures} energyData={energyData} dateRange={DEFAULT_DATE_RANGE}/>
          <button onClick={() => handleOnEnergySet('electricity')}>Electricity</button>
          <button onClick={() => handleOnEnergySet('gas')}>Gas</button>
          <button onClick={() => handleOnEnergySet('both')}>Both</button>
        </>
      }
    </div>
  );
}

export default App;
