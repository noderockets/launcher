const EventEmitter = require('events').EventEmitter;
const five = require("johnny-five");
const Particle = require("particle-io");

class Launcher extends EventEmitter {
  constructor(deviceId, token, opts) {
    super();

    this.deviceId = deviceId;
    this.token = token;

    this.opts = Object.assign({}, {
      launchPin: 2,
      airPin: 0,
      waterPin: 1,
      pressurePin: 'A0',
      z1: 270,
      slope: .54789,
      yint: -2.22689
    }, opts);

    this.ready = false;
    this.pressure = -1;

    // let initInterval = setInterval(() => {
    //   if (!this.ready) {
    //     this.initBoard();
    //   } else {
    //     clearInterval(initInterval)
    //   }
    // }, 10000);

    this.initBoard();
  }

  initBoard() {
    const particle = new Particle({
      token: this.token,
      deviceId: this.deviceId
    });

    particle.on("error", (error) => {
      console.log(error)
      this.emit("error", error);
    })

    this.board = new five.Board({
      io: particle,
      repl: false,
      debug: false
    });

    this.board.on('ready', () => {
      this.board.pinMode(this.opts.launchPin, five.Pin.OUTPUT);
      this.board.pinMode(this.opts.airPin, five.Pin.OUTPUT);
      this.board.pinMode(this.opts.waterPin, five.Pin.OUTPUT);
      this.board.pinMode(this.opts.pressurePin, five.Pin.INPUT);

      this.board.analogRead(this.opts.pressurePin, (val) => {
        // Photon reads voltage in increments of 1/4095 of 3.3V
        let voltage = val * 3.3 / 4095

        // Solve for Z2
        // Vout = (Z2 / (Z1 + Z2)) * Vin
        // Z2 = Z1 / ((Vin / Vout) - 1)
        let z2 = this.opts.z1 / ((3.3 / voltage) - 1);

        this.pressure = (this.opts.slope * z2) + this.opts.yint;
      })

      this.ready = true;
      this.emit('ready');
    });

    this.board.on('error', (error) => {
      this.emit("error", error)
    });
  }

  openAir() {
    if (this.ready)
      this.board.digitalWrite(this.opts.airPin, 1);
  }

  closeAir() {
    if (this.ready)
      this.board.digitalWrite(this.opts.airPin, 0);
  }

  openWater() {
    if (this.ready)
      this.board.digitalWrite(this.opts.waterPin, 1);
  }

  closeWater() {
    if (this.ready)
      this.board.digitalWrite(this.opts.waterPin, 0);
  }

  launch(waitToClose = 1000) {
    if (this.ready) {
      this.board.digitalWrite(this.opts.launchPin, 1);
      setTimeout(() => this.board.digitalWrite(this.opts.launchPin), waitToClose);
    }
  }
}

module.exports = Launcher;