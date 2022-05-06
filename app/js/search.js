const Fuse = require('fuse.js')
const fs = require('fs');
const { runInContext } = require('vm'); //! VS Code flags this as unused? it this true?
const { DefaultDeserializer } = require('v8'); //! VS Code flags this as unused? it this true?

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

document.getElementById("search").onkeyup = function() {
    fuseSearch()
    if (!document.getElementById("search").value) {
        summonAllEmpty();
    }
};

document.getElementById("search").onfocus = async function() {
    document.getElementById("searchResult").style.display = "block";
    //console.log("focused");

    if (!document.getElementById("search").value) {
        summonAllEmpty();
    }
};
document.getElementById("search").onblur = async function() {
    await sleep(100);
    add();
    document.getElementById("searchResult").style.display = "block";
    if (document.getElementById("search").value == 0) {
        document.getElementById("searchResult").style.display = "none";
        console.log("offfocused");
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
    add();
    var books = JSON.parse(fs.readFileSync('dat/utilities.json', 'utf8'));
    const options = { //! VS Code flags this as unused? it this true?
        threshold: 0.0
    }
    books.forEach(function(_o, i) {
        // 2. Set up the Fuse instance
        const fuse = new Fuse(books[i], {
            keys: ['utility', 'keywords', 'description']
        })
        // 3. Now search!
        var outputJson = fuse.search(document.getElementById("search").value);
        //console.log(outputJson
        summonBar(outputJson);
    });
    add();
}

/**
 * The summonAllEmpty function is used to summon all of the empty books in the library.
 * 
 * @return An array of objects, with each object containing a single book
 * @docauthor Trelent
 */
function summonAllEmpty() {
    var books = JSON.parse(fs.readFileSync('dat/utilities.json', 'utf8'));
    let booksOutput = [];
    books.forEach(function(_element, i) { //*'_' is used to inform future readers that the parameter isn't used. This is according to convention.
        books[i].forEach(function(obj) {
            let booksAfter = {};
            booksAfter.item = obj;

            booksOutput.push(booksAfter);
        });
    });
    summonBar(booksOutput);
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

        var root = process.cwd(); // Grab application directory //! VS Code flags this as unused? it this true?

        newDiv.className = i;
        newElement = document.createElement("a");
        newElement.innerHTML = obj.item.utility;
        newElement.style.display = "relative";

        newElementDescription = document.createElement("a");
        newElementDescription.innerHTML = obj.item.description;
        newElementDescription.style.display = "relative";

        newImage = document.createElement("img");
        newImage.src = obj.item.icon;

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
            var selected = document.querySelectorAll(".chosen");
            let r = document.createElement("div");
            let image = document.createElement("img");
            image.src = "img/cross.svg";
            r.className = "chosen"
            document.querySelector("#searchHistoryContainer").appendChild(r);
            r.innerHTML = obj.item.utility;
            r.id = "chosen" + obj.item.Id;
            selected.forEach(function(div, _e) { //*'_' is used to inform future readers that the parameter isn't used. This is according to convention.
                var a = document.getElementsByClassName("chosen")
                var b = document.getElementById(div.id)
                console.log(div.id);
                console.log(r.id);
                if (r.id == div.id) {
                    try { b.parentNode.removeChild(b) } catch {}; //ignores an error
                    showAlert("What the fuck is wrong with you? That component has already been added!", "warning", 5000); //calls showAlert()   
                }
            })
            searchHistoryContainer.appendChild(r);
            r.appendChild(image);
            add();
        
        /**
         * The removebutton function removes all components from the page.
         * 
         * @return Removes selected components, success message
         * @docauthor Simon Hellsing, Emil Lindén
         * @docmodifier Emil Lindén
         */}
        function removebutton() {
            var selected = document.querySelectorAll(".chosen");
            var placeholder = 0;
            selected.forEach(function(_div, e) { //*'_' is used to inform future readers that the parameter isn't used. This is according to convention.
                var a = document.getElementsByClassName("chosen")
                var b = document.getElementById(a[e].id);
                try { b.parentNode.removeChild(b) } catch {};
                placeholder++;
            })
            if (placeholder > 0) {
            showAlert("All components successfully removed!", "success", 5000); //calls showAlert()
            }
        }
        console.log(obj.item.utility)
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
                 position: "fixed"
                ,width: "50%"
                ,left: "25%"
                ,bottom: "0%"
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
    var selected = document.querySelectorAll(".chosen");

    selected.forEach(function(_div, i) {
        var a = document.getElementsByClassName("chosen")
        var b = document.getElementById(a[i].id)
        //let parent = document.querySelector(".chosen");
        b.addEventListener("click", remove);
        console.log(selected[i]);

        function remove() {
            try { b.parentNode.removeChild(b)} catch {};
        }
    })
} 