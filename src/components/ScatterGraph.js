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

function ScatterGraph({temperatures, data, dataType, dateRange}) {

  const chartData = generateDailyDates(dateRange.start, dateRange.end)
    .map((day, index) => ({
      temperature: parseFloat(temperatures[index]).toFixed(2),
      data: data ? parseFloat(data[index]).toFixed(2) : null,
      z: day
    }));

  return (
    <div className={styles.graphContainer}>
      <ResponsiveContainer height="99%">
        <ScatterChart
          data={chartData}
          margin={scatterGraphConfig.areaMargin}>
          <XAxis
            tick={scatterGraphConfig.xTickStyle}
            domain={scatterGraphConfig.tempDomain}
            dataKey="temperature"
            type="number"
            name="Temperature"
            label={scatterGraphConfig.tempLabel}/>

          <YAxis
            tick={scatterGraphConfig.yTickStyle}
            ticks={dataType === "energy" ? scatterGraphConfig.energyTickArray : scatterGraphConfig.costTickArray}
            dataKey="data"
            type="number"
            name={dataType === "energy" ? "Energy Consumption" : "Energy Cost"}
            label={dataType === "energy" ? scatterGraphConfig.energyLabel : scatterGraphConfig.costLabel}/>

          <ZAxis dataKey="z" name="Date"/>
          <Scatter
            type="monotone"
            name={dataType === "energy" ? "Energy Consumption vs Temperature" : "Energy Cost vs Temperature"}
            data={chartData}
            fill={dataType === "energy" ? "url(#colorUv)" : "url(#colorPv)"}
            // lineType='fitting'
          />

          <Tooltip/>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ScatterGraph;