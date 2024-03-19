export const scatterGraphConfig = {
  areaMargin: {top: 25, right: 35, left: 5, bottom: 25},

  yTickStyle: {strokeWidth: 1},
  xTickStyle: {strokeWidth: 1},

  tempName: 'temperature',
  tempYAxisId: 'temperature',
  tempTickArray: Array.from({length: 19}, (_, index) => index),
  tempDomain: [-3, 16],
  tempLabel: {value: 'Temperature (°C)', position: 'bottom'},

  energyName: 'energy',
  energyYAxisId: 'energy',
  energyTickArray: Array.from({length: 120}, (_, index) => index),
  energyDomain: [0, 120],
  energyLabel: {value: 'Energy (kWh)', angle: -90, position: 'left', offset: -20},

  costName: 'cost',
  costYAxisId: 'cost',
  costTickArray: Array.from({length: 13}, (_, index) => index),
  costDomain: [0, 13],
  costLabel: {value: 'Cost (£)', angle: -90, position: 'left', offset: -20},
}