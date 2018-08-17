const Launcher = require('./launcher');
const Controller = require('./controller');
const blessed = require('blessed');
const contrib = require('blessed-contrib');
const screen = blessed.screen();
const grid = new contrib.grid({ rows: 3, cols: 3, screen: screen });
const config = require('../config.json');

// grid.set(0, 0, 1, 2, contrib.picture, {
//   file: '../nrlogo.png',
//   cols: 50,
//   onReady: ready
// });

// {
//   top: 0,
//   left: 0,
//   type: 'overlay',
//   width: 'shrink',
//   height: 'shrink',
//   file: '../nrlogo.png',
//   search: false
// }

grid.set(0, 0, 1, 2, blessed.image, {
  top: 0,
  left: 0,
  type: 'overlay',
  width: 'shrink',
  height: 'shrink',
  file: '../nrlogo.png',
  search: false
});

function ready() {
  screen.render();
}

let currentPressureDonut = grid.set(0, 2, 1, 1, contrib.donut, {
  label: 'Current PSI',
  radius: 24,
  arcWidth: 12,
  yPadding: 2,
  data: [{ label: 'PSI', percent: 0 }]
});

const lcd = grid.set(2, 2, 1, 1, contrib.lcd, {
  segmentWidth: 0.06, // how wide are the segments in % so 50% = 0.5
  segmentInterval: 0.11, // spacing between the segments in % so 50% = 0.550% = 0.5
  strokeWidth: 0.11, // spacing between the segments in % so 50% = 0.5
  elements: 3, // how many elements in the display. or how many characters can be displayed.
  display: '???', // what should be displayed before first call to setDisplay
  elementSpacing: 4, // spacing between each element
  elementPadding: 2, // how far away from the edges to put the elements
  color: 'green', // color for the segments
  label: 'PSI @ Last Launch'
});

const pressureLine = grid.set(1, 0, 1, 3, contrib.line, {
  showNthLabel: 5,
  maxY: 200,
  label: 'PSI',
  showLegend: true,
  legend: { width: 10 }
});

const log = grid.set(2, 0, 1, 2, contrib.log, {
  fg: 'yellow',
  selectedFg: 'green',
  label: 'Action Log'
});

screen.key(['escape', 'q', 'C-c'], function (ch, key) {
  return process.exit(0);
});

screen.render();

// Initialize Launcher
const launcher = new Launcher(config.particle.deviceId, config.particle.token);

launcher.on('ready', () => {
  log.log(`Launcher connected`);
});

launcher.on('error', (error) => {
  log.log(`Error: ${error}`);
});

// Initialize Controller
const controller = new Controller();

controller.on('open-air', () => {
  log.log('Open air');
  launcher.openAir();
});

controller.on('close-air', () => {
  log.log('Close air');
  launcher.closeAir();
});

controller.on('open-water', () => {
  log.log('Open water');
  launcher.openWater();
});

controller.on('close-water', () => {
  log.log('Close water');
  launcher.closeWater();
});

controller.on('launch', () => {
  log.log('Launch');
  lcd.setDisplay(launcher.pressure);
  launcher.launch();
});

const pressureData = {
  title: 'PSI',
  style: { line: 'red' },
  x: [],
  y: []
}

let i = 0;
function updatePressure() {
  let pressure = launcher.pressure;
  pressureData.x.push(i++);
  pressureData.x = pressureData.x.slice(-100);
  pressureData.y.push(pressure);
  pressureData.y = pressureData.y.slice(-100);

  pressureLine.setData(pressureData);
  screen.render();

  let color = 'cyan';
  if (pressure >= 50) color = 'green';
  if (pressure >= 75) color = 'yellow';
  if (pressure >= 100) color = 'red';
  currentPressureDonut.setData([{ percent: pressure, label: 'PSI', color: color }]);
}

setInterval(updatePressure, 100);


