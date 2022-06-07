var admin_function = "adminLock()"
var admin_lock_value;
var dgram = require('dgram');
var server = dgram.createSocket("udp4");
var client = dgram.createSocket("udp4");
server.bind(8090);
//setInterval(admin_panel, 1000); //use clearInterval(lock_checkstatus) if you want to stop the checking for some reason

/**
 * The admin_panel function is used to display the admin panel when the pin is turned on.
 *
 * @return The state of the pin, if it is on or off
 * @docauthor Trelent, Simon
 */
function admin_panel() { //TODO rename to adminPanel(). MUST BE CHANGED IN A SHITTONNE OF PLACES, DO IT BUT BE CAREFUL /Warm regards, Emil
    client.send(admin_function, 0, admin_function.length, 8091, "0.0.0.0");
    console.log(admin_lock_value)
    if (admin_lock_value == '1') { //check the pin state, if the state is 0 (or off)
        document.getElementById("admin").style.display = "block";
    } else {
        document.getElementById("admin").style.display = "none";
        home();
        document.querySelector(".navbar").style.display = "block";
        try { navigation_database_con.parentNode.removeChild(navigation_database_con) } catch {}
        document.onkeydown = function(e) {};
    }
}

server.on("message", function(message) {
    admin_lock_value = message.toString();
})