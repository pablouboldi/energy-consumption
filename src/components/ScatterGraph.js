import {
  Scatter,
  ScatterChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis
} from "recharts";
import styles from "./ScatterGraph.module.css";
import generateDailyDates from "../tools/generateDailyDates";
import {scatterGraphConfig} from "../tools/scatterGraphConfig";
import ScatterTooltip from "./ScatterTooltip";

function ScatterGraph({temperatures, data, dataType, dateRange}) {

  const chartData = generateDailyDates(dateRange.start, dateRange.end)
    .map((day, index) => ({
      temperature: parseFloat(temperatures[index]).toFixed(2),
      data: data ? parseFloat(data[index]).toFixed(2) : null,
      date: day
    }));

  return (
    <div className={styles.graphContainer}>
      <ResponsiveContainer height="99%">
        <ScatterChart
          data={chartData}
          margin={scatterGraphConfig.areaMargin}>
          <XAxis
            minTickGap={50}
            tick={scatterGraphConfig.xTickStyle}
            ticks={dataType === "energy" ? scatterGraphConfig.energyTickArray : scatterGraphConfig.costTickArray}
            dataKey="data"
            type="number"
            unit={dataType === "energy" ? " kWh" : " £"}
            name={dataType === "energy" ? "Energy Consumption" : "Energy Cost"}
            label={dataType === "energy" ? scatterGraphConfig.energyLabel : scatterGraphConfig.costLabel}/>

          <YAxis
            tick={scatterGraphConfig.yTickStyle}
            domain={scatterGraphConfig.tempDomain}
            dataKey="temperature"
            type="number"
            unit="°C"
            name="Temperature"
            label={scatterGraphConfig.tempLabel}/>

          <ZAxis dataKey="date" name="Date"/>
          <Scatter
            isAnimationActive={false}
            type="monotone"
            line
            name={dataType === "energy" ? "Energy Consumption vs Temperature" : "Energy Cost vs Temperature"}
            data={chartData}
            fill={dataType === "energy" ? "#688CB6" : "#82ca9d"}
            lineType='fitting'
          />

          <Tooltip content={<ScatterTooltip dataType={dataType} />} cursor={{ fill: "transparent" }}/>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ScatterGraph;