const EventEmitter = require('events').EventEmitter;
const gamepad = require('gamepad');
const keypress = require('keypress');

class LauncherController extends EventEmitter {
  constructor() {
    super();
    gamepad.init();
    keypress(process.stdin);

    // Create a game loop and poll for events
    setInterval(gamepad.processEvents, 16);
    // Scan for new gamepads as a slower rate
    setInterval(gamepad.detectDevices, 500);
    this.attachListeners();
    this.waterPressed = false;
    this.airPressed = false;
  }

  attachListeners() {
    gamepad.on('up', (id, num) => {
      // console.log('up', {
      //   id: id,
      //   num: num
      // });


      // PS3
      switch (num) {
        case 10: // Left Button, stop water
          this.emit('close-water');
          break;
        case 8: // Left Trigger, stop air
          this.emit('close-air');
          break;
      }

      // Logitech
      // switch (num) {
      //   case 4: // Left Button, stop water
      //     this.emit('close-water');
      //     break;
      //   case 6: // Left Trigger, stop air
      //     this.emit('close-air');
      //     break;
      // }
    });

    gamepad.on('down', (id, num) => {
      // console.log('down', {
      //   id: id,
      //   num: num
      // });

      // PS3 Remote
      switch (num) {
        case 10: // Left Button, fill water
          this.emit('open-water');
          break;
        case 8: // Left Trigger, fill air
          this.emit('open-air');
          break;
        case 11:
        case 9:
        case 14: // Right Trigger, launch
          this.emit('launch');
          break;
      }

      // Logitech
      // switch (num) {
      //   case 4: // Left Button, fill water
      //     this.emit('open-water');
      //     break;
      //   case 6: // Left Trigger, fill air
      //     this.emit('open-air');
      //     break;
      //   case 1:
      //   case 5:
      //   case 7: // Right Trigger, launch
      //     this.emit('launch');
      //     break;
      // }
    });

    process.stdin.on('keypress', (ch, key) => {
      let k = key.name;
      switch (k) {
        case 'f':
          this.airPressed ? this.emit('close-air') : this.emit('open-air');
          this.airPressed = !this.airPressed;
          break;
        case 'j':
          this.waterPressed ? this.emit('close-water') : this.emit('open-water');
          this.waterPressed = !this.waterPressed;
          break;
        case 'space':
        case 'l':
          this.emit('launch');
          break;
      }

      this.lastkey = key.name;
    })

    process.stdin.setRawMode(true);
    process.stdin.resume();
  }
}

module.exports = LauncherController;