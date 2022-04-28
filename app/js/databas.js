let z = null;
let made_change = false;
var there_is_element;
var there_is_skop;
var latest_id;
var amout_of_elements;
var layout = [];
var fil = 'dat/utilities.json'
var test = 'dat/Layout.json'


function settings() {
    if (there_is_element == true && z !== null) { remove_element(); }
    if (there_is_skop == true) { remove_skop(); }
    z = null;
    add_containers();
}

function remove_element() {
    var divdata = document.getElementById("data")
    divdata.innerHTML = "";
    there_is_element = false
}

function remove_skop() {
    var divdata = document.getElementById("admin_s")
    divdata.innerHTML = "";
    there_is_skop = false
}

function remove_change() {
    if (made_change) {
        //document.getElementById("").remove();
        document.getElementById("change").innerHTML = "";
    }
}

function drag() {
    var database = JSON.parse(fs.readFileSync(fil, 'utf8'));

    var ew, we;
    var rt, oi;


    var dragSrcEl = null;

    function handleDragStart(e) {
        this.style.opacity = '0.4';

        dragSrcEl = this;

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    }

    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }

        e.dataTransfer.dropEffect = 'move';

        return false;
    }

    function handleDragEnter(e) {
        this.classList.add('over');
    }

    function handleDragLeave(e) {
        this.classList.remove('over');

    }

    function handleDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation(); // stops the browser from redirecting.
        }

        if (dragSrcEl != this) {

            we = document.getElementById(dragSrcEl.id).childNodes
            ew = document.getElementById(this.id).childNodes
            var t = dragSrcEl.id;
            rt = t.match(/\d+/)

            //console.log(rt)
            var tq = this.id;
            oi = tq.match(/\d+/)

            dragSrcEl.innerHTML = this.innerHTML;

            this.innerHTML = e.dataTransfer.getData('text/html');


        }




        return false;
    }

    function handleDragEnd(e) {
        console.log("res")
        this.style.opacity = '1';

        items.forEach(function(item) {
            item.classList.remove('over');
        });

        if (ew != null && we != null) {
            console.log(we)
            console.log(ew)
            if (oi[0] > rt[0]) {
                for (let a = 0; a < ew.length; a++) {
                    console.log(oi)
                    document.getElementById(ew[a].id).id = oi[0];

                }
                for (let a = 0; a < we.length; a++) {
                    console.log(rt)
                    document.getElementById(we[a].id).id = rt[0];

                }
                database[z].forEach(function(obj, i) {
                    if (obj.Id == rt[0]) {
                        obj.Id = oi[0]
                        console.log(oi[0])
                    } else if (obj.Id == oi[0]) {
                        obj.Id = rt[0]
                        console.log(rt[0])
                    }
                    fs.writeFileSync(fil, JSON.stringify(database, null, 3));
                })

            }
            if (oi[0] < rt[0]) {
                for (let a = 0; a < we.length; a++) {
                    console.log(rt)
                    document.getElementById(we[a].id).id = rt[0];

                }
                for (let a = 0; a < ew.length; a++) {
                    console.log(oi)
                    document.getElementById(ew[a].id).id = oi[0];

                }
                database[z].forEach(function(obj, i) {
                    if (obj.Id == oi[0]) {
                        obj.Id = rt[0]

                    } else if (obj.Id == rt[0]) {
                        obj.Id = oi[0]

                    }
                    fs.writeFileSync(fil, JSON.stringify(database, null, 3));
                })

            }
            database = JSON.parse(fs.readFileSync(fil, 'utf8'));
            database[z].sort(function(a, b) {
                return a.Id - b.Id || a.utility.localeCompare(b.utility);
            });
            fs.writeFileSync(fil, JSON.stringify(database, null, 3));
            ew = null;
            we = null;
        }
    }


    let items = document.querySelectorAll('.components');
    items.forEach(function(item) {
        console.log("all")
        item.addEventListener('dragstart', handleDragStart, false);
        item.addEventListener('dragenter', handleDragEnter, false);
        item.addEventListener('dragover', handleDragOver, false);
        item.addEventListener('dragleave', handleDragLeave, false);
        item.addEventListener('drop', handleDrop, false);
        item.addEventListener('dragend', handleDragEnd, false);
    });


}

function drag_cabinets() {
    var database = JSON.parse(fs.readFileSync(fil, 'utf8'));
    var layout = JSON.parse(fs.readFileSync(test, 'utf8'));

    var dragSrcEl = null;

    function handleDragStart(e) {
        this.style.opacity = '0.4';

        dragSrcEl = this;

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    }

    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }

        e.dataTransfer.dropEffect = 'move';

        return false;
    }

    function handleDragEnter(e) {
        this.classList.add('over');
    }

    function handleDragLeave(e) {
        this.classList.remove('over');

    }

    function handleDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation(); // stops the browser from redirecting.
        }

        if (dragSrcEl != this) {
            var drdropid = this.id;
            if (dragSrcEl.id < drdropid) {
                database[dragSrcEl.id].forEach(function(obj, i) {
                    console.log(drdropid)
                    obj.Id = "" + (Number(obj.Id) + (drdropid - dragSrcEl.id) * 60)
                })
                database[drdropid].forEach(function(obj, i) {
                    obj.Id = "" + (Number(obj.Id) - (drdropid - dragSrcEl.id) * 60)
                })
            } else if (dragSrcEl.id > drdropid) {
                database[drdropid].forEach(function(obj, i) {
                    console.log(drdropid)
                    obj.Id = "" + (Number(obj.Id) + (dragSrcEl.id - drdropid) * 60)
                })
                database[dragSrcEl.id].forEach(function(obj, i) {
                    obj.Id = "" + (Number(obj.Id) - (dragSrcEl.id - drdropid) * 60)
                })
            }

            var temp_database = database[dragSrcEl.id]
            database[dragSrcEl.id] = database[this.id]
            database[this.id] = temp_database;

            var temp_layout = layout[0][dragSrcEl.id]
            layout[0][dragSrcEl.id] = layout[0][this.id]
            layout[0][this.id] = temp_layout

            temp_layout = layout[1][dragSrcEl.id]
            layout[1][dragSrcEl.id] = layout[1][this.id]
            layout[1][this.id] = temp_layout;

            dragSrcEl.innerHTML = this.innerHTML;
            this.innerHTML = e.dataTransfer.getData('text/html');
        }

        return false;
    }

    function handleDragEnd(e) {
        console.log("res")
        this.style.opacity = '1';

        items.forEach(function(item) {
            item.classList.remove('over');
        });


        fs.writeFileSync(fil, JSON.stringify(database, null, 3))
        fs.writeFileSync(test, JSON.stringify(layout, null, 3))


    }


    let items = document.querySelectorAll('.skop');
    items.forEach(function(item) {
        console.log("all")
        item.addEventListener('dragstart', handleDragStart, false);
        item.addEventListener('dragenter', handleDragEnter, false);
        item.addEventListener('dragover', handleDragOver, false);
        item.addEventListener('dragleave', handleDragLeave, false);
        item.addEventListener('drop', handleDrop, false);
        item.addEventListener('dragend', handleDragEnd, false);
    });


}

function save_database() {
    var database = JSON.parse(fs.readFileSync(fil, 'utf8'));
    var save_arry = [];
    var save_arry_in = [];

    database.forEach(function(element, i) {
        if (i != z) {
            database[i].forEach(function(obj, x) {
                save_arry_in[x] = obj;
            });
            save_arry.push(save_arry_in);
            save_arry_in = [];
        } else {
            var all_element = document.querySelectorAll('.element')
            all_element.forEach(function(object, r) {
                console.log("times")
                database[z].forEach(function(obj, x) {

                    var className_data = document.getElementsByClassName('.element')

                    if (obj.Id == object.id) {
                        console.log(object)
                        save_arry_in[r] = obj;
                        save_arry_in[r].Id = object.id;
                    }
                });

            });
            save_arry.push(save_arry_in);
            save_arry_in = [];

        }
        save_arry[i].sort(function(a, b) {
            return a.Id - b.Id || a.utility.localeCompare(b.utility);
        });
    });
    fs.writeFileSync(fil, JSON.stringify(save_arry, null, 3));
}


function add_element(q) {
    var database = JSON.parse(fs.readFileSync(fil, 'utf8'));
    database[q].sort(function(a, b) {
        return a.Id - b.Id || a.utility.localeCompare(b.utility);
    });
    fs.writeFileSync(fil, JSON.stringify(database, null, 3));

    if (there_is_element == true && z != null) { remove_element(); }
    document.getElementById("data").style.display = "grid";
    there_is_element = true;
    z = q;
    document.getElementById("admin_s").style.display = "none";
    let diffrent_partern_layout = document.createElement("div");
    let standard_partern_layout = document.createElement("div");
    let diffrent_partern_layout2 = document.createElement("div");
    layout = JSON.parse(fs.readFileSync(test, 'utf8'));
    database[q].forEach(function(obj, w) {
        database = JSON.parse(fs.readFileSync(fil, 'utf8'));
        if (layout[0][q] == 1) { display_layout1(obj, w, standard_partern_layout, diffrent_partern_layout, diffrent_partern_layout2); }
        if (layout[0][q] == 2) { display_layout2(obj, w, standard_partern_layout, diffrent_partern_layout, diffrent_partern_layout2); }
        if (layout[0][q] == 3) { display_layout3(obj, w, standard_partern_layout, diffrent_partern_layout, diffrent_partern_layout2); }
    })
    change_databas(q);

}

function add_containers() {
    layout = JSON.parse(fs.readFileSync(test, 'utf8'));
    var database = JSON.parse(fs.readFileSync(fil, 'utf8'));


    database.forEach(function(array, q) {

        let skop = document.createElement("div");
        skop.className = "skop";
        document.querySelector("#admin_s").appendChild(skop);
        var cl = document.getElementsByClassName('skop');

        cl[q].id = q
        cl[q].innerHTML = layout[1][q]
        there_is_skop = true;
        skop.draggable = true;
        drag_cabinets();


        document.getElementById(cl[q].id).addEventListener("click", select_cabinet)

        function select_cabinet() {
            document.getElementById("selected_cabinet").innerHTML = "";
            let select_cabinet_change_name = document.createElement("input")
            let select_cabinet_open_button = document.createElement("button")
            let select_cabinet_remove = document.createElement("button")

            selected_cabinet.id = "selected_cabinet";
            select_cabinet_change_name.id = "select_cabinet_change_name"
            select_cabinet_open_button.id = "select_cabinet_open_button"
            select_cabinet_open_button.innerHTML = "Open"
            select_cabinet_remove.id = "select_cabinet_remove"
            select_cabinet_remove.innerHTML = "Remove"
            select_cabinet.innerHTML = cl[q].id

            document.querySelector("#selected_cabinet").appendChild(select_cabinet_change_name)
            document.querySelector("#selected_cabinet").appendChild(select_cabinet_open_button)
            document.querySelector("#selected_cabinet").appendChild(select_cabinet_remove)

            document.getElementById("select_cabinet_open_button").onclick = function() {
                document.getElementById("admin_s").innerHTML = "";
                document.getElementById("selected_cabinet").innerHTML = "";
                chose();
            }
            document.getElementById("select_cabinet_remove").onclick = function() {
                database.splice(q, 1);
                fs.writeFileSync(fil, JSON.stringify(database, null, 3));
                remove_skop();
                add_containers();
            }



            drag_cabinets();
        }

        function chose() {
            add_element(q);
            drag();
        }

        amout_of_cabinet = q;

    })

    let new_skop = document.createElement("div");
    new_skop.className = "new_cabinet";
    new_skop.id = "new_cabinet"
    document.querySelector("#admin_s").appendChild(new_skop);
    var cl = document.getElementsByClassName('new_cabinet');
    document.getElementById("new_cabinet").innerHTML = "New cabinet"


    let cabinet_name = document.createElement("input")
    cabinet_name.id = "cabinet_name"
    cabinet_name.placeholder = "Name of cabinet"
    let placeholder_select_layout = document.createElement("div")
    let placeholder_layout_1 = document.createElement("div");
    let placeholder_layout_2 = document.createElement("div");
    let placeholder_layout_3 = document.createElement("div");
    placeholder_select_layout.className = "layout";
    placeholder_select_layout.id = "select_layout"
    placeholder_layout_1.className = "layout";
    placeholder_layout_1.id = "layout_1";
    placeholder_layout_1.innerHTML = "Layout 1"
    placeholder_layout_2.className = "layout";
    placeholder_layout_2.id = "layout_2";
    placeholder_layout_2.innerHTML = "Layout 2"
    placeholder_layout_3.className = "layout";
    placeholder_layout_3.id = "layout_3";
    placeholder_layout_3.innerHTML = "Layout 3"
    placeholder_select_layout.appendChild(cabinet_name);
    placeholder_select_layout.appendChild(placeholder_layout_1);
    placeholder_select_layout.appendChild(placeholder_layout_2);
    placeholder_select_layout.appendChild(placeholder_layout_3);
    document.querySelector("#admin_s").appendChild(placeholder_select_layout);
    document.getElementById("select_layout").style.display = "none";

    document.getElementById(new_skop.id).addEventListener("click", new_cabinet)

    function new_cabinet() {
        document.getElementById("select_layout").style.display = "block";
        document.getElementById("new_cabinet").parentNode.removeChild(document.getElementById("new_cabinet"))

        document.getElementById("layout_1").onclick = function() {
            layout = JSON.parse(fs.readFileSync(test, 'utf8'));
            layout[0][amout_of_cabinet + 1] = 1;
            layout[1][amout_of_cabinet + 1] = document.getElementById("cabinet_name").value;



            console.log(amout_of_cabinet);
            var arr = Array.from(Array(amout_of_cabinet + 2), () => new Array());
            fs.writeFileSync(test, JSON.stringify(layout, null, 3));

            database.forEach(function(obj, i) {
                arr[i] = database[i]
                database[i].forEach(function(object, x) {
                    latest_id = object.Id;
                })
            })

            var latest_id = ((amout_of_cabinet + 1) * 60);
            console.log(latest_id)
            var newID;
            for (let i = 0; i < 60; i++) {
                arr[amout_of_cabinet + 1][i] = {
                    "utility": "",
                    "icon": "images\\template.jpg",
                    "description": "",
                    "keywords": "",
                    "favourite": "false",
                    "number": "1",
                    "Id": ""

                }


                newID = (((amout_of_cabinet + 1) * 60) + 1) + i;
                latest_id = newID


                arr[amout_of_cabinet + 1][i].Id = "" + newID;
                arr[amout_of_cabinet + 1][i].utility = "­";

                fs.writeFileSync(fil, JSON.stringify(arr, null, 3));
            }
            document.getElementById("select_layout").innerHTML = "";
            document.getElementById("select_layout").parentNode.removeChild(document.getElementById("select_layout"));
            add_containers();
            console.log(database);

        }
        document.getElementById("layout_2").onclick = function() {
            layout = JSON.parse(fs.readFileSync(test, 'utf8'));
            layout[0][amout_of_cabinet + 1] = 2;
            layout[1][amout_of_cabinet + 1] = document.getElementById("cabinet_name").value;



            console.log(amout_of_cabinet);
            var arr = Array.from(Array(amout_of_cabinet + 2), () => new Array());
            fs.writeFileSync(test, JSON.stringify(layout, null, 3));

            database.forEach(function(obj, i) {
                arr[i] = database[i]
                database[i].forEach(function(object, x) {
                    latest_id = object.Id;
                })
            })
            var first_change = ((amout_of_cabinet + 2) * 60) - 30;
            console.log(first_change)
            var second_change = ((amout_of_cabinet + 2) * 60) - 10;
            console.log(second_change)
            var latest_id = ((amout_of_cabinet + 1) * 60);
            console.log(latest_id)
            var newID;
            for (let i = 0; i < 40; i++) {
                arr[amout_of_cabinet + 1][i] = {
                    "utility": "",
                    "icon": "images\\template.jpg",
                    "description": "",
                    "keywords": "",
                    "favourite": "false",
                    "number": "1",
                    "Id": ""

                }

                if (latest_id < first_change) {
                    if (latest_id < first_change) { newID = (((amout_of_cabinet + 1) * 60) + 1) + i; }
                    latest_id = newID
                } else if (latest_id < second_change) {
                    if (latest_id == ((amout_of_cabinet + 2) * 60) - 30) { newID = (Number(latest_id)) + 1; }
                    if (latest_id == ((amout_of_cabinet + 2) * 60) - 29) { newID = (Number(latest_id)) + 2; }
                    if (latest_id == ((amout_of_cabinet + 2) * 60) - 27) { newID = (Number(latest_id)) + 2; }
                    if (latest_id == ((amout_of_cabinet + 2) * 60) - 25) { newID = (Number(latest_id)) + 6; }
                    if (latest_id == ((amout_of_cabinet + 2) * 60) - 19) { newID = (Number(latest_id)) + 2; }
                    if (latest_id == ((amout_of_cabinet + 2) * 60) - 17) { newID = (Number(latest_id)) + 2; }
                    if (latest_id == ((amout_of_cabinet + 2) * 60) - 15) { newID = (Number(latest_id)) + 1; }
                    if (latest_id == ((amout_of_cabinet + 2) * 60) - 14) { newID = (Number(latest_id)) + 2; }
                    if (latest_id == ((amout_of_cabinet + 2) * 60) - 12) { newID = (Number(latest_id)) + 2; }
                    latest_id = newID
                } else if (latest_id == second_change) { newID = (Number(latest_id)) + 8; }
                latest_id = newID

                arr[amout_of_cabinet + 1][i].Id = "" + newID;
                arr[amout_of_cabinet + 1][i].utility = "­";

                fs.writeFileSync(fil, JSON.stringify(arr, null, 3));
            }
            document.getElementById("select_layout").innerHTML = "";
            document.getElementById("select_layout").parentNode.removeChild(document.getElementById("select_layout"));
            add_containers();
            console.log(database);

        }
        document.getElementById("layout_3").onclick = function() {
            layout = JSON.parse(fs.readFileSync(test, 'utf8'));
            layout[0][amout_of_cabinet + 1] = 3;
            layout[1][amout_of_cabinet + 1] = document.getElementById("cabinet_name").value;



            console.log(amout_of_cabinet);
            var arr = Array.from(Array(amout_of_cabinet + 2), () => new Array());
            fs.writeFileSync(test, JSON.stringify(layout, null, 3));

            database.forEach(function(obj, i) {
                arr[i] = database[i]
                database[i].forEach(function(object, x) {
                    latest_id = object.Id;
                })
            })

            var first_change = ((amout_of_cabinet + 2) * 60) - 15;
            console.log(first_change)
            var latest_id = ((amout_of_cabinet + 1) * 60);
            console.log(latest_id)
            var newID;
            for (let i = 0; i < 51; i++) {
                arr[amout_of_cabinet + 1][i] = {
                    "utility": "",
                    "icon": "images\\template.jpg",
                    "description": "",
                    "keywords": "",
                    "favourite": "false",
                    "number": "1",
                    "Id": ""

                }

                if (latest_id < first_change) {
                    if (latest_id < first_change) { newID = (((amout_of_cabinet + 1) * 60) + 1) + i; }
                    latest_id = newID
                } else {
                    if (latest_id == ((amout_of_cabinet + 2) * 60) - 15) { newID = (Number(latest_id)) + 1; }
                    if (latest_id == ((amout_of_cabinet + 2) * 60) - 14) { newID = (Number(latest_id)) + 2; }
                    if (latest_id == ((amout_of_cabinet + 2) * 60) - 12) { newID = (Number(latest_id)) + 2; }
                    if (latest_id == ((amout_of_cabinet + 2) * 60) - 10) { newID = (Number(latest_id)) + 6; }
                    if (latest_id == ((amout_of_cabinet + 2) * 60) - 4) { newID = (Number(latest_id)) + 2; }
                    if (latest_id == ((amout_of_cabinet + 2) * 60) - 2) { newID = (Number(latest_id)) + 2; }

                    latest_id = newID
                }
                latest_id = newID

                arr[amout_of_cabinet + 1][i].Id = "" + newID;
                arr[amout_of_cabinet + 1][i].utility = "­";

                fs.writeFileSync(fil, JSON.stringify(arr, null, 3));
            }
            document.getElementById("select_layout").innerHTML = "";
            document.getElementById("select_layout").parentNode.removeChild(document.getElementById("select_layout"));
            add_containers();
            console.log(database);
        }

    }



}

function change_databas(q) {

    var database = JSON.parse(fs.readFileSync(fil, 'utf8'));
    let change_placeholder = document.createElement("div");
    let change = document.createElement("div");
    change_placeholder.id = "change_placeholder"
    change.className = "change";
    change.id = "change"
    change.role = "dialog"
    document.getElementById("data").insertBefore(change_placeholder, document.getElementById("data").firstChild);
    change_placeholder.appendChild(change);
    console.log(database);
    var clas = document.querySelectorAll(".components")
    var elem = document.querySelectorAll(".element")

    clas.forEach(function(obj, i) {
        console.log("many")

        var className = document.getElementsByClassName("components")
        var class_id = document.getElementById(className[i].id);

        console.log(class_id)
        class_id.addEventListener("click", change)

        function change() {
            document.getElementById("change_placeholder").style.display = "block";
            made_change = true;
            document.getElementById("change").innerHTML = "";
            database = JSON.parse(fs.readFileSync(fil, 'utf8'));
            console.log(database);

            window.onclick = function(event) {
                if (event.target == change_placeholder) {
                    change_placeholder.style.display = "none";
                }
            }
            var k = 0;

            database[z].forEach(function(p, g) {

                if (p.Id + "outer" == clas[i].id) {

                    let add_component = document.createElement("button");
                    let placeholder = document.createElement("div");
                    let name = document.createElement("div");
                    let input_utility = document.createElement("input");
                    let input_description = document.createElement("input");
                    let input_key = document.createElement("input");
                    let save_button = document.createElement("button");
                    placeholder.className = "placeholder_change_databas";
                    placeholder.id = "placeholder_change_databas"

                    name.className = "name" + k;
                    name.id = "name" + k;
                    name.innerHTML = database[q][g].utility;

                    input_utility.className = "utility_change" + k;
                    input_utility.id = "utility_change" + k
                    input_utility.placeholder = "Utility: " + p.utility;


                    input_utility.onclick = function add_utility() {
                        if (document.getElementById(input_utility.id).value.length == 0) {
                            console.log("value");
                            if (document.getElementById(input_utility.id).value == "­") {
                                document.getElementById(input_utility.id).value = "d";
                            }
                            document.getElementById(input_utility.id).value = p.utility;
                        }
                    }

                    input_description.className = "description_change" + k;
                    input_description.id = "description_change" + k
                    input_description.placeholder = "Description: " + p.description;
                    input_description.onclick = function add_description() {
                        if (document.getElementById(input_description.id).value.length == 0) {
                            console.log("value");
                            document.getElementById(input_description.id).value = p.description;
                        }
                    }

                    input_key.className = "key_change" + k;
                    input_key.id = "key_change" + k;
                    input_key.placeholder = "Keywords: " + database[q][g].keywords;
                    input_key.onclick = function add_description() {
                        if (document.getElementById(input_key.id).value.length == 0) {
                            console.log("value");
                            document.getElementById(input_key.id).value = database[q][g].keywords;
                        }
                    }

                    save_button.className = "save_button" + k;
                    save_button.id = "save_button" + k;
                    save_button.value = "Save" + k;
                    save_button.innerHTML = "Save";
                    save_button.onclick = function() {
                        var new_utility = document.getElementById(input_utility.id).value;
                        var new_description = document.getElementById(input_description.id).value;
                        var new_key = document.getElementById(input_key.id).value

                        if (new_utility.length > 0 && new_utility != " ") {
                            console.log(new_utility)
                            database[q][g].utility = new_utility;
                        }
                        if (new_description.length > 0 && new_description != " ") {
                            database[q][g].description = new_description;
                        }
                        if (new_key.length > 0 && new_key != " ") {
                            database[q][g].keywords = new_key;
                        }




                        fs.writeFileSync(fil, JSON.stringify(database, null, 3));
                        var divdata = document.getElementById("data")
                        divdata.innerHTML = "";
                        made_change = true;
                        remove_change()
                        add_element(q);
                        drag();

                    }
                    var not_the_sameid = false;
                    database[z].forEach(function(ele, y) {
                        if (y == g && y != 0 && y != database[z].length - 1) {
                            if (database[z][y + 1].Id == p.Id || database[z][y - 1].Id == p.Id) {
                                not_the_sameid = true;
                            }
                        }
                        if (y == g && y == 0) {
                            if (database[z][y + 1].Id == p.Id) {
                                not_the_sameid = true
                            }
                        }
                        if (y == g && y == database[z].length - 1) {
                            if (database[z][y - 1].Id == p.Id) {
                                not_the_sameid = true
                            }
                        }

                    })
                    let remove_button = document.createElement("button");
                    remove_button.className = "remove_button" + k;
                    remove_button.id = "remove_button" + k;
                    remove_button.value = "Remove" + k;
                    remove_button.innerHTML = "Remove";
                    console.log(not_the_sameid)


                    remove_button.onclick = function() {
                        database[z].splice(g, 1);
                        class_id.parentNode.removeChild(class_id);
                        layout = JSON.parse(fs.readFileSync(test, 'utf8'));

                        fs.writeFileSync(fil, JSON.stringify(database, null, 3));
                        var divdata = document.getElementById("data")
                        divdata.innerHTML = "";
                        made_change = true
                        remove_change();
                        add_element(q);
                        drag();

                    }

                    add_component.id = "add_component" + k
                    add_component.innerHTML = "Add component"

                    add_component.onclick = function() {
                        var same_id = p.Id;

                        document.getElementById("change").innerHTML = "";
                        add_same_id(q, same_id)


                    }





                    document.getElementById("change").appendChild(name);
                    document.getElementById("change").appendChild(input_utility);
                    document.getElementById("change").appendChild(input_description);
                    document.getElementById("change").appendChild(input_key);
                    document.getElementById("change").appendChild(save_button);
                    if (not_the_sameid) { document.getElementById("change").appendChild(remove_button); }
                    document.getElementById("change").appendChild(add_component)


                    k = k + 1;
                }
                console.log("stop")
            })

        }

    })
}

function add_same_id(q, same_id) {
    var database = JSON.parse(fs.readFileSync(fil, 'utf8'));
    let name_new = document.createElement("input")
    let name_new_button = document.createElement("button")

    name_new.id = "name_new_component"
    name_new_button.id = "name_new_component_button"
    document.querySelector("#data").appendChild(name_new);
    document.querySelector("#data").appendChild(name_new_button);

    name_new_button.onclick = function() {
        console.log("here")
        var newComponent_name;
        if (document.getElementById("name_new_component").value != null) {
            newComponent_name = document.getElementById("name_new_component").value;
        }
        database[q][amout_of_elements + 1] = {
            "utility": "",
            "icon": "images\\template.jpg",
            "description": "description",
            "keywords": "keyword",
            "favourite": "false",
            "number": "1",
            "Id": ""
        }
        var newID = (Number(same_id));
        console.log(Number(same_id));
        database[q][amout_of_elements + 1].Id = "" + newID;
        database[q][amout_of_elements + 1].utility = "" + newComponent_name
        database[q].sort(function(a, b) {
            return a.Id - b.Id || a.utility.localeCompare(b.utility);
        });
        fs.writeFileSync(fil, JSON.stringify(database, null, 3));

        var divdata = document.getElementById("data")
        divdata.innerHTML = "";
        made_change = true
        remove_change();
        add_element(q);
        drag();
    }
}