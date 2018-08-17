const EventEmitter = require('events').EventEmitter;
const gamepad = require('gamepad');

class LauncherController extends EventEmitter {
  constructor() {
    super();
    gamepad.init();
    // Create a game loop and poll for events
    setInterval(gamepad.processEvents, 16);
    // Scan for new gamepads as a slower rate
    setInterval(gamepad.detectDevices, 500);
    this.attachListeners();
  }

  attachListeners() {
    gamepad.on('up', (id, num) => {
      // console.log('up', {
      //   id: id,
      //   num: num
      // });

      switch (num) {
        case 4: // Left Button, stop water
          this.emit('close-water');
          break;
        case 6: // Left Trigger, stop air
          this.emit('close-air');
          break;
      }
    });

    gamepad.on('down', (id, num) => {
      // console.log('down', {
      //   id: id,
      //   num: num
      // });

      switch (num) {
        case 4: // Left Button, fill water
          this.emit('open-water');
          break;
        case 6: // Left Trigger, fill air
          this.emit('open-air');
          break;
        case 1:
        case 5:
        case 7: // Right Trigger, launch
          this.emit('launch');
          break;
      }
    });
  }
}

module.exports = LauncherController;