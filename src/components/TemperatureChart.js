import {Area, AreaChart, CartesianGrid, Label, Tooltip, XAxis, YAxis} from "recharts";

function TemperatureChart({data, energyData}) {
  const tempTickArray = Array.from({length: 20}, (_, index) => -5 + index)
  const energyTickArray = Array.from({length: 120}, (_, index) => index)
  const yTickStyle = {stroke: 'blue', strokeWidth: 0.2}
  const xTickStyle = {stroke: 'red', strokeWidth: 0.2}

  return (
    <AreaChart width={1500} height={500} data={data}
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

      <YAxis yAxisId={'temp'} tick={yTickStyle} domain={[-6, 16]} ticks={tempTickArray}
             label={{value: 'Temperature (°C)', angle: -90, position: 'insideLeft'}}/>
      <Area yAxisId={'temp'} type="linear" dataKey="temperature" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)"/>

      {energyData &&
        <>
          <YAxis yAxisId={'energy'} tick={yTickStyle} domain={[-50, 120]} ticks={energyTickArray}
                 label={{value: 'Energy (kWh)', angle: -90, position: 'insideRight'}} orientation='right'/>
          <Area yAxisId={'energy'} type="linear" dataKey="energy" stroke="#8884d8" fillOpacity={1}
                fill="url(#colorPv)"/>
        </>
      }

      <Tooltip/>
      {/*<Legend/>*/}
    </AreaChart>
  );
}

export default TemperatureChart;