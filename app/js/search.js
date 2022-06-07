const Fuse = require('fuse.js')
const fs = require('fs');
var dgram = require('dgram');
var statment = true;
var multi_times = 0;
//const { runInContext } = require('vm'); //! VS Code flags this as unused? it this true?
//const { DefaultDeserializer } = require('v8'); //! VS Code flags this as unused? it this true?
//const console = require('console');
/**  Function to send data to pcb
 * var dgram = require('dgram');
 * // Create a udp socket client object
 *  var client = dgram.createSocket("udp4");
 * // Set command line input character encoding to utf-8
 *  process.stdin.setEncoding('utf-8');
 * // message variable to send
 * var message = "MESSAGE";
 * client.send(message, 0, message.length, 8089, "0.0.0.0");
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
document.getElementById("search").blur();
document.getElementById("search").onkeyup = function() {

    if (document.getElementById("search").value.length > 0) {
        fuseSearch();

        document.getElementById("searchResult").style.display = "block";
    } else {
        var list = document.getElementsByClassName("aaaa")

        while (list.length > 0) {
            list[0].parentNode.removeChild(list[0])
        }
        document.getElementById("searchResult").style.display = "none";
    }
};

document.getElementById("search").onfocus = async function() {
    var list = document.getElementsByClassName("componentCard")
    if (document.getElementById("search").value.length > 0) {
        fuseSearch();

        document.getElementById("searchResult").style.display = "block";
    } else {

        while (list.length > 0) {
            list[0].parentNode.removeChild(list[0])
        }
        document.getElementById("searchResult").style.display = "none";
    }
};

document.getElementById("search").onblur = function() {

    document.getElementById("searchResult").style.display = "block";
    if (document.getElementById("search").value == 0) {
        document.getElementById("searchResult").style.display = "none";

        document.addEventListener("keydown", function(e) {
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

    books.forEach(function(o) {

        // 2. Set up the Fuse instance

        var fuse = new Fuse(o, {
            threshold: 0.3,
            shouldSort: true,
            keys: ['utility', 'keywords', 'description']

        })
        var afterbook = {};
        // 3. Now search!
        if (document.getElementById("search").value == "joelpe") {
            document.getElementById("navbar").style.display = "none";
            document.getElementById("bodySection").style.display = "none";
            loadingscreen();
            document.getElementById("search").value = null;
        }
        afterbook = fuse.search(document.getElementById("search").value)

        console.log(output.length)
        output = output.concat(afterbook)
    });

    summonBar(output);
    remove_component();

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
        if (i > 15) return false;
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

        const els = document.querySelectorAll('.componentCard');
        document.querySelectorAll('.componentCard').forEach(function(item) {
            item.onclick = function() {
                searchHistory(this.id);
            }
        })


        function searchHistory(ID) {

            var database = JSON.parse(fs.readFileSync('dat/utilities.json', 'utf8'));
            var client = dgram.createSocket("udp4");
            process.stdin.setEncoding('utf-8');
            var message = "pixel(";
            // message variable to send
            database[Math.floor(ID / 60)].forEach(function(element) {
                //console.log(element.Id, obj.item.Id)
                if (element.Id == ID) {
                    var selected = document.querySelectorAll(".chosen");
                    multi_times = multi_times + 1
                    if (multi_times > 1) {
                        statment = false;
                    }
                    let r = document.createElement("div");
                    let image = document.createElement("img");
                    image.src = "img/cross.svg";
                    r.className = "chosen"
                    document.querySelector("#searchHistoryContainer").appendChild(r);
                    r.innerHTML = element.utility;
                    r.id = "chosen" + element.Id;
                    searchHistoryContainer.appendChild(r);
                    r.appendChild(image);

                    if (statment) {
                        selected.forEach(function(div, e) {
                            var b = document.getElementById(div.id)
                            if (r.id == div.id) {
                                try { b.parentNode.removeChild(b) } catch {}; //ignores an error
                                try { document.getElementById("alerts-container").innerHTML = "" } catch {};
                                showAlert("What the fuck is wrong with you? That component has already been added!", "warning", 5000); //calls showAlert()  
                            }
                        })
                    }

                }


            })

            statment = true;
            multi_times = 0;

            message = message + ("" + (obj.item.Id - 1) + ",0xFFFFFF)")

            client.send(message, 0, message.length, 8089, "0.0.0.0");

            remove_component();
        }
        /**
         * The removebutton function removes all components from the page.
         * 
         * @return Removes selected components, success message
         * @docauthor Simon Hellsing, Emil Lindén
         * @docmodifier Emil Lindén
         */
        var del_history = document.getElementById("removeHistory");
        del_history.onclick = function removebutton() {
            var client = dgram.createSocket("udp4");
            process.stdin.setEncoding('utf-8');
            var selected = document.querySelectorAll(".chosen");
            var placeholder = 0;
            var message = "clear()"
            selected.forEach(function(div, _e) { //*'_' is used to inform future readers that the parameter isn't used. This is according to convention.
                var a = document.getElementsByClassName("chosen")
                var b = document.getElementById(div.id);
                try { b.parentNode.removeChild(b) } catch {};
                placeholder++;
            })
            if (placeholder > 0) {
                showAlert("All components successfully removed!", "success", 5000); //calls showAlert()

            }
            client.send(message, 0, message.length, 8089, "192.168.1.7");
        }
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
 * The remove_component function removes a chosen component to the selected class.
 * 
 * @return The selected element
 * @docauthor Trelent
 */
function remove_component() {

    var client = dgram.createSocket("udp4");
    process.stdin.setEncoding('utf-8');
    var selected = document.querySelectorAll(".chosen");
    document.querySelectorAll('.chosen').forEach(item => {
        item.addEventListener('click', event => {
            selected.forEach(function(element) {
                if (item.id == element.id) {
                    var message = "pixel(";
                    var b = document.getElementById(item.id)
                    try { b.parentNode.removeChild(b) } catch {};
                    var remove_id = item.id.replace(/^\D+/g, ''); // replace all leading non-digits with nothing
                    message = message + ("" + (remove_id - 1) + ",0x000000)")
                    client.send(message, 0, message.length, 8089, "0.0.0.0");
                }
            })
        })
    })

}