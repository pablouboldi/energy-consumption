import {Area, AreaChart, CartesianGrid, Label, Tooltip, XAxis, YAxis} from "recharts";

function Graph({temperatures, energyData, dateRange}) {
  const tempTickArray = Array.from({length: 20}, (_, index) => -5 + index)
  const energyTickArray = Array.from({length: 120}, (_, index) => index)
  const yTickStyle = {stroke: 'blue', strokeWidth: 0.2}
  const xTickStyle = {stroke: 'red', strokeWidth: 0.2}
  let chartData;

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

  if (energyData && temperatures.length > 0) {
    chartData = generateDailyDates(dateRange.start, dateRange.end)
      .map((day, index) => ({
        name: day,
        temperature: temperatures[index],
        energy: energyData[index]
      }));
  } else if (temperatures.length > 0) {
    chartData = generateDailyDates(dateRange.start, dateRange.end)
      .map((day, index) => ({name: day, value: temperatures[index]}));
  } else {
    chartData = [];
  }

  return (
    <AreaChart width={1500} height={500} data={chartData}
               margin={{top: 20, right: 20, left: 15, bottom: 15}}>
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
        </linearGradient>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
        </linearGradient>
      </defs>
      <XAxis minTickGap={50} tick={xTickStyle} tickCount={10} dataKey="name">
        <Label value="Date" offset={-10} position="insideBottom"/>
      </XAxis>
      <CartesianGrid stroke="#eee"/>

      <YAxis yAxisId={'energy'} tick={yTickStyle} domain={[-50, 120]} ticks={energyTickArray}
             label={{value: 'Energy (kWh)', angle: -90, position: 'insideRight'}} orientation='right' hide={!energyData}/>
      <Area yAxisId={'energy'} type="linear" dataKey="energy" stroke="#8884d8" fillOpacity={1}
            fill="url(#colorPv)" hide={!energyData}/>

      <YAxis yAxisId={'temp'} tick={yTickStyle} domain={[-6, 16]} ticks={tempTickArray}
             label={{value: 'Temperature (°C)', angle: -90, position: 'insideLeft'}}/>
      <Area yAxisId={'temp'} type="linear" dataKey="temperature" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)"/>


      <Tooltip/>
      {/*<Legend/>*/}

    </AreaChart>


  );
}

export default Graph;