import {Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import styles from "./AreaGraph.module.css";
import {areaGraphConfig} from "../tools/areaGraphConfig";
import generateDailyDates from "../tools/generateDailyDates";

function AreaGraph({temperatures, data, dataType, dateRange}) {

  const chartData = generateDailyDates(dateRange.start, dateRange.end)
    .map((day, index) => ({
      day: day,
      temperature: parseFloat(temperatures[index]).toFixed(2),
      data: data ? parseFloat(data[index]).toFixed(2) : null
    }));

  return (
    <div className={styles.graphContainer}>
      <ResponsiveContainer height="99%">
        <AreaChart
          data={chartData}
          margin={areaGraphConfig.areaMargin}>
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
          <XAxis
            minTickGap={50}
            tick={areaGraphConfig.xTickStyle}
            tickCount={10}
            dataKey="day"
            label={areaGraphConfig.dateLabel}/>

          <YAxis tick={areaGraphConfig.yTickStyle}
            yAxisId={areaGraphConfig.tempYAxisId}
            domain={areaGraphConfig.tempDomain}
            ticks={areaGraphConfig.tempTickArray}
            label={areaGraphConfig.tempLabel}/>
          <Area yAxisId={areaGraphConfig.tempYAxisId}
            type="monotone"
            dataKey="temperature"
            name={areaGraphConfig.tempName}
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"/>

          <YAxis
            tick={areaGraphConfig.yTickStyle}
            yAxisId={dataType === "energy" ? areaGraphConfig.energyYAxisId : areaGraphConfig.costYAxisId}
            domain={dataType === "energy" ? areaGraphConfig.energyDomain : areaGraphConfig.costDomain}
            ticks={dataType === "energy" ? areaGraphConfig.energyTickArray : areaGraphConfig.costTickArray}
            label={dataType === "energy" ? areaGraphConfig.energyLabel : areaGraphConfig.costLabel}
            orientation='right'/>
          <Area
            yAxisId={dataType === "energy" ? areaGraphConfig.energyYAxisId : areaGraphConfig.costYAxisId}
            type="monotone"
            dataKey='data'
            name={dataType === "energy" ? areaGraphConfig.energyName : areaGraphConfig.costName}
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorPv)"/>

          <Tooltip/>
          {/* <Legend/>*/}

        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AreaGraph;