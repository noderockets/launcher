
const five = require('johnny-five');
const Raspi = require('raspi-io');

const board = five.Board({
    io: new Raspi()
});

board.on('ready', () => {
    const led = new five.Led('P1-12');
    led.fadeIn();
    setTimeout(function(){
        led.fadeOut()
    },(3 * 1000));
    
    
});

