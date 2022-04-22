const Fuse = require('fuse.js')
const fs = require('fs');
const { runInContext } = require('vm');
const { DefaultDeserializer } = require('v8');

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

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

document.getElementById("search").onblur = async function() {
    await sleep(100);

    var search_elements = document.getElementById("searchResult")

    //hom();
    document.getElementById("searchResult").style.display = "block";
    if (document.getElementById("search").value == 0) {
        document.getElementById("searchResult").style.display = "none";

        document.addEventListener("keypress", function(e) {
            document.getElementById("search").focus();

        })

    }



};

function fuseSearch() {
    // 1. List of items to search in

    var books = JSON.parse(fs.readFileSync('dat/utilities.json', 'utf8'));

    const options = {
        threshold: 0.0
    }
    var output = [];

    books.forEach(function(o, i) {

        // 2. Set up the Fuse instance

        const fuse = new Fuse(books[i], {
            keys: ['utility', 'keywords', 'description']
        })
        var afterbook = {};
        // 3. Now search!

        afterbook = fuse.search(document.getElementById("search").value)


        output = output.concat(afterbook)

    });
    summonBar(output);
    add();


}

function summonBar(inputJson) { // Reads the JSONdata and makes it magically appear under Search
    document.getElementById("searchResult").innerHTML = "";
    inputJson.forEach(function(obj, i) {
        //console.log(obj);

        let newDiv = document.createElement("div");
        let contentDiv = document.createElement("div");
        let contentDivDescription = document.createElement("div");
        let contentcontainer = document.createElement("div");
        //newDiv.className = "menubarAContainer";

        var root = process.cwd(); // Grab application directory

        newDiv.className = i;
        newElement = document.createElement("a");
        newElement.innerHTML = obj.item.utility;
        newElement.style.display = "relative";

        newElementDescription = document.createElement("a");
        newElementDescription.innerHTML = obj.item.description;
        newElementDescription.style.display = "relative";

        newImage = document.createElement("img");
        newImage.src = obj.item.icon;

        contentDiv.className = "searchContentDiv";
        contentDivDescription.className = "searchContentDivDescription";
        newDiv.className = "aaaa";
        contentcontainer.className = "container";

        document.querySelector("#searchResult").appendChild(newDiv);

        contentcontainer.appendChild(contentDivDescription);
        contentcontainer.appendChild(newImage);
        newDiv.appendChild(contentDiv);
        newDiv.appendChild(contentcontainer);

        contentDiv.appendChild(newElement);
        contentDivDescription.appendChild(newElementDescription);
        var class_id = document.getElementsByClassName('aaaa');
        class_id[i].id = obj.item.Id; //Ger ett id för varje sökbara element

        var element_id = document.getElementById(class_id[i].id);

        element_id.addEventListener("click", sayhello); //säger vilket id div tillhör

        var del_history = document.getElementById("removeHistory");
        del_history.addEventListener("click", removebutton);


        function sayhello() {
            var selected = document.querySelectorAll(".chosen");
            let r = document.createElement("div");
            let image = document.createElement("img");
            image.src = "img/cross.svg";
            r.className = "chosen"
            document.querySelector("#searchHistory").appendChild(r);
            r.innerHTML = obj.item.utility;
            r.id = "chosen" + obj.item.Id;
            selected.forEach(function(div, e) {
                var a = document.getElementsByClassName("chosen")
                var b = document.getElementById(a[e].id)
                    //console.log(a[e].id);
                    //console.log(r.id);
                if (r.id == a[e].id) {
                    try { b.parentNode.removeChild(b) } catch {}; //ignores an error

                    //ALERT MESASGES
                    //code from https://stackoverflow.com/questions/8965018/dynamically-creating-bootstrap-css-alert-messages

                    showAlert("Vad fan gör du? Den komponenten är redan tillagd!", "warning", 5000);

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
                        if (closeDelay)
                            window.setTimeout(function() { alert.alert("close") }, closeDelay);
                    }


                }
            })
            searchHistory.appendChild(r);
            r.appendChild(image);
            add();
        }

        function removebutton() {
            var selected = document.querySelectorAll(".chosen");
            selected.forEach(function(div, e) {
                var a = document.getElementsByClassName("chosen")
                var b = document.getElementById(a[e].id);
                try { b.parentNode.removeChild(b) } catch {};
            })
        }

        /*if (element_id !== sayhello().target && !element_id.contains(sayhello().target)) {    
            console.log('clicking outside the div');
            element_id.style.height == "160px";
        }*/
    });
}

function add() {
    var selected = document.querySelectorAll(".chosen");

    selected.forEach(function(div, i) {
        var a = document.getElementsByClassName("chosen")
        var b = document.getElementById(a[i].id)
            //let parent = document.querySelector(".chosen");
        b.addEventListener("click", remove);
        console.log(selected[i]);

        function remove() {
            try { b.parentNode.removeChild(b) } catch {};
        }
    })
}