var z = null;
var there_is_element = false;
var there_is_skop = false;

function settings() {
    //var ins = document.getElementById("admin")
    //ins.addEventListener("click", function() {
    //console.log("ll")
    if (there_is_element == true && z != null) { remove_element(); }
    if (there_is_skop == true) { remove_skop(); }
    z = null;
    var books = JSON.parse(fs.readFileSync('dat/utilities.json', 'utf8'));

    books.forEach(function(array, q) {
        console.log("ll")
        let skop = document.createElement("div");
        skop.className = "skop";
        document.querySelector("#admin_s").appendChild(skop);
        var cl = document.getElementsByClassName('skop')
            //var di = document.getElementById(cl[q].id)
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
                var component_class = document.getElementsByClassName('componentes')
                components.id = obj.Id;
                components.innerHTML = obj.utility;

                //var component_id = document.getElementById(component_class[w].id)
                //component_id.innerHTML = component_class[w].utility;


            })
        }



    })

    //})
}

function remove_element() {

    var books = JSON.parse(fs.readFileSync('dat/utilities.json', 'utf8'));

    books[z].forEach(function(obj, w) {
        elem = document.getElementById(obj.Id)
        console.log(elem)
        elem.parentNode.removeChild(elem);
    })
    there_is_element = false;
}

function remove_skop() {
    var books = JSON.parse(fs.readFileSync('dat/utilities.json', 'utf8'));
    books.forEach(function(array, i) {
        console.log("la")
        var d = document.getElementById("placeholder" + i)
        d.parentNode.removeChild(d);
    })
    there_is_skop = false
}