import ErrorMessage from "../components/ErrorMessage";
import FileImport from "../components/FileImport";
import AreaGraph from "./AreaGraph";
import CorrelationCoefficient from "../components/CorrelationCoefficient";
import EnergyTypeButton from "../components/EnergyTypeButton";
import CostTypeButton from "../components/CostTypeButton";
import Spinner from "./Spinner";
import Papa from "papaparse";
import {useEffect, useState} from "react";

import styles from './Dashboard.module.css'
import ScatterGraph from "./ScatterGraph";

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

function Dashboard({combinedData}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [temperatures, setTemperatures] = useState([]);
  // const [combinedData, setCombinedData] = useState([]);
  const [energyType, setEnergyType] = useState('both');
  const [costType, setCostType] = useState('both');

  // function handleFileUpload(event) {
  //   const files = event.target.files;
  //   const promises = [];
  //
  //   for (let i = 0; i < files.length; i++) {
  //     promises.push(processFile(files[i]));
  //   }
  //
  //   async function processFile(file) {
  //     return new Promise((resolve, reject) => {
  //       Papa.parse(file, {
  //         header: true,
  //         skipEmptyLines: true,
  //         complete: result => {
  //           setCombinedData(prevData => prevData.concat(result.data));
  //           resolve();
  //         },
  //         error: reject
  //       });
  //     });
  //   }
  //
  //   Promise.all(promises)
  //     .catch(error => {
  //       console.error("Error parsing file:", error);
  //     });
  // }

  function handleOnEnergySet(energyType) {
    setEnergyType(energyType);
  }

  function handleOnCostSet(costType) {
    setCostType(costType);
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

  const costData = combinedData.map(data => {
    switch (costType) {
      case 'electricity':
        return parseFloat(data["Electricity cost (£)"]) || 0;
      case 'gas':
        return parseFloat(data["Gas cost (£)"]) || 0;
      default:
        return (parseFloat(data["Electricity cost (£)"]) || 0) +
          (parseFloat(data["Gas cost (£)"]) || 0);
    }
  })

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
    <div className={styles.dashboard}>
      {isLoading && <Spinner/>}
      {error && <ErrorMessage message={error}/>}
      {!isLoading && !error &&
        <>
          <AreaGraph
            temperatures={temperatures}
            data={energyData}
            dataType={'energy'}
            dateRange={DEFAULT_DATE_RANGE}/>
          <AreaGraph
            temperatures={temperatures}
            data={costData}
            dataType={'cost'}
            dateRange={DEFAULT_DATE_RANGE}/>

          <ScatterGraph
            temperatures={temperatures}
            data={energyData}
            dataType={'energy'}
            dateRange={DEFAULT_DATE_RANGE}/>
          <ScatterGraph
            temperatures={temperatures}
            data={costData}
            dataType={'cost'}
            dateRange={DEFAULT_DATE_RANGE}/>


          {/*{energyData.length !== 0 ?*/}
          {/*  <CorrelationCoefficient*/}
          {/*    temperatures={temperatures}*/}
          {/*    data={energyData}*/}
          {/*    dataType={'energy'}/> : null}*/}
          {/*{energyData.length !== 0 ?*/}
          {/*  <CorrelationCoefficient*/}
          {/*    temperatures={temperatures}*/}
          {/*    data={costData}*/}
          {/*    dataType={'cost'}/> : null}*/}

          {/*{energyData.length !== 0 ?*/}
          {/*  <>*/}
          {/*    <EnergyTypeButton label="Electricity Energy" onClick={() => handleOnEnergySet('electricity')}/>*/}
          {/*    <EnergyTypeButton label="Gas Energy" onClick={() => handleOnEnergySet('gas')}/>*/}
          {/*    <EnergyTypeButton label="Both Energies" onClick={() => handleOnEnergySet('both')}/>*/}

          {/*    <CostTypeButton label="Electricity Cost" onClick={() => handleOnCostSet('electricity')}/>*/}
          {/*    <CostTypeButton label="Gas Cost" onClick={() => handleOnCostSet('gas')}/>*/}
          {/*    <CostTypeButton label="Both Costs" onClick={() => handleOnCostSet('both')}/>*/}
          {/*  </> :*/}
          {/*  null*/}
          {/*}*/}
        </>
      }
    </div>
  )
}

export default Dashboard;