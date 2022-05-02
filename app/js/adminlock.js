var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var admin_key = new Gpio(4, 'in'); //use GPIO pin 4, and specify that it is output
var admin_panel = setInterval(blinkLED, 250);

function admin_panel() {
    if (admin_key.readSync() === 1) { //check the pin state, if the state is 0 (or off)
        document.getElementById("admin").style.display = "block";
    } else {
        document.getElementById("admin").style.display = "none";
    }

}