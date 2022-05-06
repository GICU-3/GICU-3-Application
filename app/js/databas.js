var z = null;
var there_is_element = false;
var there_is_skop = false;

/**
 * The settings function is used to create the settings menu. //? Is this really true?
 * 
 * @return The settings of the utility
 * @docauthor Trelent
 */
function settings() {
    if (there_is_element == true && z != null) { remove_element(); }
    if (there_is_skop == true) { remove_skop(); }
    z = null;
    var books = JSON.parse(fs.readFileSync('dat/utilities.json', 'utf8'));

    books.forEach(function(_array, q) { //*'_' is used to inform future readers that the parameter isn't used. This is according to convention.
        console.log("ll")
        let skop = document.createElement("div");
        skop.className = "skop";
        document.querySelector("#admin_s").appendChild(skop);
        var cl = document.getElementsByClassName('skop')
        cl[q].id = "placeholder" + q
        cl[q].innerHTML = cl[q].id
        there_is_skop = true;
        document.getElementById(cl[q].id).onclick = function(event) {
            document.getElementById("data").style.display = "block";
            z = q;
            there_is_element = true;
            document.getElementById("admin_s").style.display = "none";
            books[q].forEach(function(obj, w) {
                let components = document.createElement("div");
                components.className = "components";
                document.querySelector("#data").appendChild(components);
                var component_class = document.getElementsByClassName('componentes') //! VS Code flags this as unused? it this true?
                components.id = obj.Id;
                components.innerHTML = obj.utility;
            })
        }
    })
}

/**
 * The remove_element function removes the element from the DOM.
 *
 * @return The elements that have been removed
 * @docauthor Trelent
 */
function remove_element() {
    var books = JSON.parse(fs.readFileSync('dat/utilities.json', 'utf8'));
    books[z].forEach(function(obj, w) {
        elem = document.getElementById(obj.Id)
        console.log(elem)
        elem.parentNode.removeChild(elem);
    })
    there_is_element = false;
}

/**
 * The remove_skop function removes the skop from the page.
 *
 * @return The removed element
 * @docauthor Trelent
 */
function remove_skop() {
    var books = JSON.parse(fs.readFileSync('dat/utilities.json', 'utf8'));
    books.forEach(function(array, i) {
        console.log("la")
        var d = document.getElementById("placeholder" + i)
        d.parentNode.removeChild(d);
    })
    there_is_skop = false
}