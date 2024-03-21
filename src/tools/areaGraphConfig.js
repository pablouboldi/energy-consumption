export const areaGraphConfig = {
  areaMargin: {top: 25, right: 10, left: 5, bottom: 25},

  yTickStyle: {strokeWidth: 1},
  xTickStyle: {strokeWidth: 1},

  dateLabel: {value: "Date", position: "bottom"},

  tempName: "Temperature",
  tempYAxisId: "temperature",
  tempTickArray: Array.from({length: 20}, (_, index) => -5 + index),
  tempDomain: [-6, 16],
  tempLabel: {value: "Temperature", angle: -90, position: "left", offset: -20},

  energyName: "Energy",
  energyYAxisId: "energy",
  energyTickArray: Array.from({length: 120}, (_, index) => index),
  energyDomain: [-50, 120],
  energyLabel: {value: "Energy", angle: -90, position: "right", offset: -0},
  energyColor: "#688CB6",

  costName: "Cost",
  costYAxisId: "cost",
  costTickArray: Array.from({length: 16}, (_, index) => index),
  costDomain: [-5, 16],
  costLabel: {value: "Cost", angle: -90, position: "right", offset: -20},
  costColor: "#82ca9d",
};