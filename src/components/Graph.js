import {Area, AreaChart, CartesianGrid, Label, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

const graphConfig = {
  areaMargin: {top: 20, right: 20, left: 15, bottom: 15},

  yTickStyle: {stroke: 'blue', strokeWidth: 0.2},
  xTickStyle: {stroke: 'red', strokeWidth: 0.2},

  tempName: 'temperature',
  tempYAxisId: 'temperature',
  tempTickArray: Array.from({length: 20}, (_, index) => -5 + index),
  tempDomain: [-6, 16],
  tempLabel: {value: 'Temperature (°C)', angle: -90, position: 'insideLeft'},

  energyName: 'energy',
  energyYAxisId: 'energy',
  energyTickArray: Array.from({length: 120}, (_, index) => index),
  energyDomain: [-50, 120],
  energyLabel: {value: 'Energy (kWh)', angle: -90, position: 'insideRight'},

  costName: 'cost',
  costYAxisId: 'cost',
  costTickArray: Array.from({length: 16}, (_, index) => index),
  costDomain: [-5, 16],
  costLabel: {value: 'Cost (£)', angle: -90, position: 'insideRight'},
}

function Graph({temperatures, data, dataType, dateRange}) {

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

  const chartData = generateDailyDates(dateRange.start, dateRange.end)
    .map((day, index) => ({
      name: day,
      temperature: parseFloat(temperatures[index]).toFixed(2),
      data: data ? parseFloat(data[index]).toFixed(2) : null
    }));

  return (
    <ResponsiveContainer width='100%' height={400}>
      <AreaChart data={chartData} margin={graphConfig.areaMargin}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={1}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={1}/>
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis minTickGap={50} tick={graphConfig.xTickStyle} tickCount={10} dataKey="name">
          <Label value="Date" offset={-10} position="insideBottom"/>
        </XAxis>
        <CartesianGrid stroke="#eee"/>

        <YAxis tick={graphConfig.yTickStyle}
               yAxisId={dataType === 'energy' ? graphConfig.energyYAxisId : graphConfig.costYAxisId}
               domain={dataType === 'energy' ? graphConfig.energyDomain : graphConfig.costDomain}
               ticks={dataType === 'energy' ? graphConfig.energyTickArray : graphConfig.costTickArray}
               label={dataType === 'energy' ? graphConfig.energyLabel : graphConfig.costLabel}
               orientation='right'/>
        <Area yAxisId={dataType === 'energy' ? graphConfig.energyYAxisId : graphConfig.costYAxisId}
              type="monotone"
              dataKey='data'
              name={dataType === 'energy' ? graphConfig.energyName : graphConfig.costName}
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorPv)"/>

        <YAxis tick={graphConfig.yTickStyle}
               yAxisId={graphConfig.tempYAxisId}
               domain={graphConfig.tempDomain}
               ticks={graphConfig.tempTickArray}
               label={graphConfig.tempLabel}/>
        <Area yAxisId={graphConfig.tempYAxisId}
              type="monotone"
              dataKey="temperature"
              name={graphConfig.tempName}
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"/>

        <Tooltip/>
        {/*<Legend/>*/}

      </AreaChart>
    </ResponsiveContainer>
  );
}

export default Graph;