# Using NodeJS

It is possible to write NodeJS applications for the Particle Photon using the excellent [Johnny-Five](http://johnny-five.io/) library. 

In order to use Johnny-Five you must load the VoodooSpark custom firmware on to the .  This firmware exposes a remote interface that allows the photon to be controlled over a TCP connection. Follow the instructions [here](https://github.com/voodootikigod/voodoospark#loading-the-firmware) to load the firmware on your photon.

Once you've loaded the firmware on the device you can start using Johnny-Five to program the photon.  To learn more about Johnny-Five check out there [documentation](http://johnny-five.io/api/).

#### Example:  Using Johnny-Five

```javascript
const five = require('johnny-five');
const Particle = require('particle-io');

const board = new five.Board({
  io: new Particle({
    token: {{ACCESS_TOKEN}},
    deviceId: {{DEVICE_ID}}
  })
});

board.on('ready', () => {
  // Initialize LED Pin
  board.pinMode(D7, five.Pin.OUTPUT);
});

let  byte = 0;

// This will "blink" the on board led
setInterval(() => {
  board.digitalWrite("D7", (byte ^= 1));
}, 1000);
```

#### Example:  Reading analog values

```javascript
const five = require('johnny-five');
const Particle = require('particle-io');

const board = new five.Board({
  io: new Particle({
    token: {{ACCESS_TOKEN}},
    deviceId: {{DEVICE_ID}}
  })
});

board.on('ready', () => {
  // Initialize LED Pin
  board.pinMode(A0, five.Pin.INPUT);

  board.analogRead('A0', (val)=> {
    console.log(val);
  })
});
```