const EventEmitter = require('events').EventEmitter;
const five = require("johnny-five");
const Particle = require("particle-io");

class Launcher extends EventEmitter {
  constructor(deviceId, token, opts) {
    super();

    this.opts = Object.assign({}, {
      launchPin: 2,
      airPin: 0,
      waterPin: 1,
      pressurePin: 'A0'
    }, opts);

    this.ready = false;
    this.pressure = -1;

    this.board = new five.Board({
      io: new Particle({
        token,
        deviceId
      }),
      repl: false,
      debug: false
    });

    this.board.on('ready', () => {
      this.board.pinMode(this.opts.launchPin, five.Pin.OUTPUT);
      this.board.pinMode(this.opts.airPin, five.Pin.OUTPUT);
      this.board.pinMode(this.opts.waterPin, five.Pin.OUTPUT);
      this.board.pinMode(this.opts.pressurePin, five.Pin.INPUT);

      this.board.analogRead(this.opts.pressurePin, (val) => {
        // TODO - calculate pressure
        this.pressure = val;
      })

      this.ready = true;
      this.emit('ready');
    })
  }

  openAir() {
    this.board.digitalWrite(this.opts.airPin, 1);
  }

  closeAir() {
    this.board.digitalWrite(this.opts.airPin, 0);
  }

  openWater() {
    this.board.digitalWrite(this.opts.waterPin, 1);
  }

  closeWater() {
    this.board.digitalWrite(this.opts.waterPin, 0);
  }

  launch(waitToClose = 1000) {
    this.board.digitalWrite(this.opts.launchPin, 1);
    setTimeout(() => this.board.digitalWrite(this.opts.launchPin), waitToClose);
  }
}

module.exports = Launcher;