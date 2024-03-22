import {Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import styles from "./AreaGraph.module.css";
import {areaGraphConfig} from "../tools/areaGraphConfig";
import generateDailyDates from "../tools/generateDailyDates";
import AreaTooltip from "./AreaTooltip";

function AreaGraph({temperatures, data, dataType, dateRange}) {

  const chartData = generateDailyDates(dateRange.start, dateRange.end)
    .map((date, index) => ({
      date: date,
      temperature: parseFloat(temperatures[index]).toFixed(2),
      data: data && parseFloat(data[index]).toFixed(2)
    }));

  return (
    <div className={styles.graphContainer}>
      <ResponsiveContainer height="99%">
        <AreaChart
          data={chartData}
          margin={areaGraphConfig.areaMargin}>
          <defs>
            <linearGradient id="temp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#fff" stopOpacity={1}/>
              <stop offset="95%" stopColor="#fff" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="data" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"
                    stopColor={dataType === "energy" ? areaGraphConfig.energyColor : areaGraphConfig.costColor}
                    stopOpacity={1}/>
              <stop offset="95%"
                    stopColor={dataType === "energy" ? areaGraphConfig.energyColor : areaGraphConfig.costColor}
                    stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis
            minTickGap={50}
            tick={areaGraphConfig.xTickStyle}
            tickCount={10}
            dataKey="date"
            label={areaGraphConfig.dateLabel}/>

          <YAxis
            tick={areaGraphConfig.yTickStyle}
            yAxisId={areaGraphConfig.tempYAxisId}
            domain={areaGraphConfig.tempDomain}
            ticks={areaGraphConfig.tempTickArray}
            label={areaGraphConfig.tempLabel}
            type="number"
            unit="°C"/>
          <Area
            yAxisId={areaGraphConfig.tempYAxisId}
            type="monotone"
            dataKey="temperature"
            name={areaGraphConfig.tempName}
            stroke="#fff"
            fillOpacity={1}
            fill="url(#temp)"/>

          <YAxis
            tick={areaGraphConfig.yTickStyle}
            yAxisId={dataType === "energy" ? areaGraphConfig.energyYAxisId : areaGraphConfig.costYAxisId}
            domain={dataType === "energy" ? areaGraphConfig.energyDomain : areaGraphConfig.costDomain}
            ticks={dataType === "energy" ? areaGraphConfig.energyTickArray : areaGraphConfig.costTickArray}
            label={dataType === "energy" ? areaGraphConfig.energyLabel : areaGraphConfig.costLabel}
            type="number"
            unit={dataType === "energy" ? " kWh" : " £"}
            orientation="right"/>
          <Area
            yAxisId={dataType === "energy" ? areaGraphConfig.energyYAxisId : areaGraphConfig.costYAxisId}
            type="monotone"
            dataKey="data"
            name={dataType === "energy" ? areaGraphConfig.energyName : areaGraphConfig.costName}
            stroke={dataType === "energy" ? areaGraphConfig.energyColor : areaGraphConfig.costColor}
            fillOpacity={1}
            fill="url(#data)"/>

          <Tooltip content={<AreaTooltip dataType={dataType}/>} cursor={{fill: "transparent"}}/>

        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AreaGraph;