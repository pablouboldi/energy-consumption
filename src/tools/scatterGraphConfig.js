export const scatterGraphConfig = {
  areaMargin: {top: 25, right: 35, left: 5, bottom: 25},

  yTickStyle: {strokeWidth: 1},
  xTickStyle: {strokeWidth: 1},

  tempName: "Temperature",
  tempYAxisId: "temperature",
  tempTickArray: Array.from({length: 19}, (_, index) => index),
  tempDomain: [-3, 16],
  tempLabel: {value: "Temperature", angle: -90, position: "left", offset: -20},

  energyName: "Energy",
  energyYAxisId: "energy",
  energyTickArray: Array.from({length: 114}, (_, index) => index),
  energyDomain: [0, 114],
  energyLabel: {value: "Energy", position: "bottom"},

  costName: "Cost",
  costYAxisId: "cost",
  costTickArray: Array.from({length: 13}, (_, index) => index),
  costDomain: [0, 13],
  costLabel: {value: "Cost", position: "bottom"},
};