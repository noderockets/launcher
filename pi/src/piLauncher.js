
const five = require('johnny-five');
const Raspi = require('raspi-io');

const board = Five.board({
    io: new Raspi()
});

board.on('ready', () => {
    const led = new five.Led('P1-12');
    led.blink();
});

