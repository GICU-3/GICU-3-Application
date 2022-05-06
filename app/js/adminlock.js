var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var admin_key = new Gpio(4, 'in'); //use GPIO pin 4, and specify that it is output
var lock_checkstatus = setInterval(admin_panel, 250); //use clearInterval(lock_checkstatus) if you want to stop the checking for some reason

/**
 * The admin_panel function is used to display the admin panel when the pin is turned on.
 *
 * @return The state of the pin, if it is on or off
 * @docauthor Trelent, Simon
 */
function admin_panel() { //TODO rename to adminPanel()
    if (admin_key.readSync() === 1) { //check the pin state, if the state is 0 (or off)
        document.getElementById("admin").style.display = "block";
    } else {
        document.getElementById("admin").style.display = "none";
    }
}