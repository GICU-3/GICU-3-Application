const Fuse = require('fuse.js')
const fs = require('fs');
var dgram = require('dgram');
const { runInContext } = require('vm'); //! VS Code flags this as unused? it this true?
const { DefaultDeserializer } = require('v8'); //! VS Code flags this as unused? it this true?
var led = [];
/**  Function to send data to pcb
 * var dgram = require('dgram');
 * // Create a udp socket client object
 *  var client = dgram.createSocket("udp4");
 * // Set command line input character encoding to utf-8
 *  process.stdin.setEncoding('utf-8');
 * // message variable to send
 * var message = "MESSAGE";
 * client.send(message, 0, message.length, 8089, "127.0.0.1");
 */

/**
 * The sleep function takes a number of milliseconds as its argument, and returns a promise that resolves after the given duration.
 *
 * @param ms Specify the time in milliseconds to wait before executing the next line of code
 * @return A promise
 * @docauthor Trelent
 */
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
document.getElementById("search").focus();

document.getElementById("search").onkeyup = function() {

    if (document.getElementById("search").value.length > 0) {
        fuseSearch();

        document.getElementById("searchResult").style.display = "block";
    } else {
        var list = document.getElementsByClassName("aaaa")
        console.log("test")
        while (list.length > 0) {
            list[0].parentNode.removeChild(list[0])
        }
        document.getElementById("searchResult").style.display = "none";
    }


};

document.getElementById("search").onfocus = async function() {
    var list = document.getElementsByClassName("componentCard")
    if (document.getElementById("search").value.length > 0) {
        console.log(document.getElementById("search"))
        fuseSearch();

        document.getElementById("searchResult").style.display = "block";
    } else {

        while (list.length > 0) {
            list[0].parentNode.removeChild(list[0])
        }
        document.getElementById("searchResult").style.display = "none";
    }
};

document.getElementById("search").onblur = async function() {
    await sleep(100);

    document.getElementById("searchResult").style.display = "block";
    if (document.getElementById("search").value == 0) {
        document.getElementById("searchResult").style.display = "none";

        document.addEventListener("keypress", function(e) {
            console.log(e)
            document.getElementById("search").focus();
        })
        var list = document.getElementsByClassName("componentCard")

        while (list.length > 0) {
            list[0].parentNode.removeChild(list[0])
        }
    }



};

/**
 * The fuseSearch function searches through the JSON file for a specific search term.
 * 
 * @return The output of the fuse search
 * @docauthor Trelent
 */
function fuseSearch() {
    // 1. List of items to search in

    var books = JSON.parse(fs.readFileSync('dat/utilities.json', 'utf8'));
    var output = [];

    books.forEach(function(o, i) {

        // 2. Set up the Fuse instance

        const fuse = new Fuse(books[i], {
            threshold: 0.3,
            shouldSort: true,
            keys: ['utility', 'keywords', 'description']
        })
        var afterbook = {};
        // 3. Now search!

        afterbook = fuse.search(document.getElementById("search").value)


        output = output.concat(afterbook)
        console.log(output)
    });

    summonBar(output);
    add();

}

/**
 * The summonBar function reads the JSONdata and makes it magically appear under Search.
 *
 * @param inputJson Read the json data and make it appear under search
 * @return A div with the text &quot;hello world!&quot;
 * @docauthor Trelent
 */
function summonBar(inputJson) {
    document.getElementById("searchResult").innerHTML = "";
    inputJson.forEach(function(obj, i) {

        let newDiv = document.createElement("div");
        let componentCard = document.createElement("div");
        let componentCardDescription = document.createElement("div");
        let componentCardContainer = document.createElement("div");

        newDiv.className = i;
        newElement = document.createElement("a");
        newElement.innerHTML = obj.item.utility;
        newElement.style.display = "relative";

        newElementDescription = document.createElement("a");
        newElementDescription.innerHTML = obj.item.description;
        newElementDescription.style.display = "relative";

        newImage = document.createElement("img");
        newImage.src = obj.item.icon;
        if (localStorage.getItem('theme') == 'dark') {
            newImage.style.filter = "invert(100%)"
        }
        if (localStorage.getItem('theme') == 'light') {
            newImage.style.filter = "invert(0%)"
        }
        componentCard.className = "componentCardHeader";
        componentCardDescription.className = "componentCardDescription";
        newDiv.className = "componentCard";
        componentCardContainer.className = "container";

        document.querySelector("#searchResult").appendChild(newDiv);

        componentCardContainer.appendChild(componentCardDescription);
        componentCardContainer.appendChild(newImage);
        newDiv.appendChild(componentCard);
        newDiv.appendChild(componentCardContainer);

        componentCard.appendChild(newElement);
        componentCardDescription.appendChild(newElementDescription);
        var class_id = document.getElementsByClassName('componentCard');
        class_id[i].id = obj.item.Id; //Assigns an ID to every searchable element

        var element_id = document.getElementById(class_id[i].id);

        element_id.addEventListener("click", sayhello); //säger vilket id div tillhör

        var del_history = document.getElementById("removeHistory");
        del_history.addEventListener("click", removebutton);

        /**
         * The sayhello function says hello to the world.
         * 
         * @return A div with the text &quot;hello world!&quot;
         * @docauthor Trelent
         */
        function sayhello() {
            var client = dgram.createSocket("udp4");
            process.stdin.setEncoding('utf-8');
            var message = "array([";
            // message variable to send
            var selected = document.querySelectorAll(".chosen");
            let r = document.createElement("div");
            let image = document.createElement("img");
            image.src = "img/cross.svg";
            r.className = "chosen"
            document.querySelector("#searchHistoryContainer").appendChild(r);
            r.innerHTML = obj.item.utility;
            r.id = "chosen" + obj.item.Id;
            led.push(obj.item.Id);
            searchHistoryContainer.appendChild(r);
            r.appendChild(image);
            selected.forEach(function(div, e) { //*'_' is used to inform future readers that the parameter isn't used. This is according to convention.
                var a = document.getElementsByClassName("chosen")
                var b = document.getElementById(div.id)
                console.log(div.id);
                console.log(r.id);
                if (r.id == div.id) {
                    try { b.parentNode.removeChild(b) } catch {}; //ignores an error
                    led.splice(e, 1)
                    showAlert("What the fuck is wrong with you? That component has already been added!", "warning", 5000); //calls showAlert()   
                }
            })
            for (var amount = 0; amount < led.length; amount++) {
                if (amount + 1 == led.length) { message = message + ("" + led[amount]) } else { message = message + ("" + led[amount]) + "," }
            }
            message = message + "],0xFFFFFF)"
            if (led.length > 0) {
                console.log(message);
                //client.send(message, 0, message.length, 8089, "127.0.0.1");
            } else {
                message = "clear()";
                console.log(message);
                //client.send(message, 0, message.length, 8089, "127.0.0.1");
            }
            add();

            /**
             * The removebutton function removes all components from the page.
             * 
             * @return Removes selected components, success message
             * @docauthor Simon Hellsing, Emil Lindén
             * @docmodifier Emil Lindén
             */
        }

        function removebutton() {
            var selected = document.querySelectorAll(".chosen");
            var placeholder = 0;
            var message = "clear()"
            selected.forEach(function(div, e) { //*'_' is used to inform future readers that the parameter isn't used. This is according to convention.
                var a = document.getElementsByClassName("chosen")
                var b = document.getElementById(div.id);
                try { b.parentNode.removeChild(b) } catch {};
                placeholder++;
            })
            if (placeholder > 0) {
                showAlert("All components successfully removed!", "success", 5000); //calls showAlert()
                led = [];
                console.log(led)
                console.log(message);
                //client.send(message, 0, message.length, 8089, "127.0.0.1");
            }

        }
        //console.log(obj.item.utility)
    });
}

/**
 * The showAlert function displays an alert message in the browser.
 * 
 * @param message Display the message in the alert box
 * @param type Set the alert type
 * @param closeDelay Close the alert after a specified amount of time
 * @return The alert div
 * @docauthor Trelent
 */
function showAlert(message, type, closeDelay) {
    var $cont = $("#alerts-container");
    if ($cont.length == 0) {
        // alerts-container does not exist, create it
        $cont = $('<div id="alerts-container">')
            .css({
                //adjust message position
                position: "fixed",
                width: "50%",
                left: "25%",
                bottom: "0%"
            })
            .appendTo($("body"));
    }
    // default to alert-info; other options include success, warning, danger
    type = type || "info";
    // create the alert div
    var alert = $('<div>')
        .addClass("fade in show alert alert-" + type)
        .append(
            $('<button type="button" class="close" data-dismiss="alert">')
            .append("&times;")
        )
        .append(message);
    // add the alert div to top of alerts-container, use append() to add to bottom
    $cont.prepend(alert);
    // if closeDelay was passed - set a timeout to close the alert
    if (closeDelay) {
        window.setTimeout(function() { alert.alert("close") }, closeDelay);
    }
}

/**
 * The add function adds a chosen class to the selected elements.
 * 
 * @return The selected element
 * @docauthor Trelent
 */
function add() {
    var client = dgram.createSocket("udp4");
    process.stdin.setEncoding('utf-8');
    var selected = document.querySelectorAll(".chosen");

    selected.forEach(function(_div, i) {
        var a = document.getElementsByClassName("chosen")
        var b = document.getElementById(a[i].id)
            //let parent = document.querySelector(".chosen");
        b.onclick = function remove() {
            var message = "array([";
            try { b.parentNode.removeChild(b) } catch {};
            //console.log(selected[i]);
            led.splice(i, 1)
                /* led.forEach(function(_value, e) {
                     message = made_change + led[e] + ","
                 })
                 */
            for (var amount = 0; amount < led.length; amount++) {
                if (amount + 1 == led.length) { message = message + ("" + led[amount]) } else { message = message + ("" + led[amount]) + "," }
            }
            message = message + "],0xFFFFFF)"
            if (led.length > 0) {
                console.log(message);
                //client.send(message, 0, message.length, 8089, "127.0.0.1");
            } else {
                var message = "clear()"
                console.log(message);
                //client.send(message, 0, message.length, 8089, "127.0.0.1");
            }
            add()


        }


    })
}