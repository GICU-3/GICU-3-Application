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
    remove_change();
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
            dragSrcEl.innerHTML = this.innerHTML;
            this.innerHTML = e.dataTransfer.getData('text/html');
        }

        return false;
    }

    function handleDragEnd(e) {
        this.style.opacity = '1';

        items.forEach(function(item) {
            item.classList.remove('over');
        });
        save_database();
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
            database[z].forEach(function(object, r) {
                console.log("times")
                database[z].forEach(function(obj, x) {

                    var className = document.getElementsByClassName('components')

                    if (obj.utility == className[r].innerHTML) {
                        save_arry_in[x] = obj;
                        save_arry_in[x].Id = className[r].id;
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
    layout = JSON.parse(fs.readFileSync(test, 'utf8'));
    if (layout[0][z] == 1) { layout1(q); }
    if (layout[0][z] == 2) { layout2(q, standard_partern_layout, diffrent_partern_layout); }
    if (layout[0][z] == 3) { layout3(q, standard_partern_layout, diffrent_partern_layout); }


}

function add_containers() {
    layout = JSON.parse(fs.readFileSync(test, 'utf8'));
    var database = JSON.parse(fs.readFileSync(fil, 'utf8'));
    database.forEach(function(array, q) {

        let skop = document.createElement("div");
        skop.className = "skop";
        document.querySelector("#admin_s").appendChild(skop);
        var cl = document.getElementsByClassName('skop');

        cl[q].id = layout[1][q]
        cl[q].innerHTML = cl[q].id
        there_is_skop = true;



        document.getElementById(cl[q].id).addEventListener("click", select_cabinet)

        function select_cabinet() {
            let selected_cabinet = document.createElement("div")
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

            selected_cabinet.appendChild(select_cabinet_change_name)
            selected_cabinet.appendChild(select_cabinet_open_button)
            selected_cabinet.appendChild(select_cabinet_remove)
            document.querySelector("#admin_s").appendChild(selected_cabinet);
            document.getElementById("select_cabinet_open_button").onclick = function() {
                document.getElementById("admin_s").innerHTML = "";
                chose();
            }
            document.getElementById("select_cabinet_remove").onclick = function() {
                database.splice(q, 1);
                fs.writeFileSync(fil, JSON.stringify(database, null, 3));
                remove_skop();
                add_containers();
            }




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
    placeholder_select_layout.className = "select_layout";
    placeholder_select_layout.id = "select_layout"
    placeholder_layout_1.className = "layout_1";
    placeholder_layout_1.id = "layout_1";
    placeholder_layout_1.innerHTML = "Layout 1"
    placeholder_layout_2.className = "layout_2";
    placeholder_layout_2.id = "layout_2";
    placeholder_layout_2.innerHTML = "Layout 2"
    placeholder_layout_3.className = "layout_3";
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
            arr[amout_of_cabinet + 1][0] = {
                "utility": "Name",
                "icon": "images\\template.jpg",
                "description": "description",
                "keywords": "keyword",
                "favourite": "false",
                "number": "1",
                "Id": ""
            }

            var newID = ((amout_of_cabinet + 1) * 60) + 1;
            arr[amout_of_cabinet + 1][0].Id = "" + newID;
            fs.writeFileSync(fil, JSON.stringify(arr, null, 3));
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
            arr[amout_of_cabinet + 1][0] = {
                "utility": "Name",
                "icon": "images\\template.jpg",
                "description": "description",
                "keywords": "keyword",
                "favourite": "false",
                "number": "1",
                "Id": ""
            }

            var newID = ((amout_of_cabinet + 1) * 60) + 1;
            arr[amout_of_cabinet + 1][0].Id = "" + newID;
            fs.writeFileSync(fil, JSON.stringify(arr, null, 3));
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
            arr[amout_of_cabinet + 1][0] = {
                "utility": "Name",
                "icon": "images\\template.jpg",
                "description": "description",
                "keywords": "keyword",
                "favourite": "false",
                "number": "1",
                "Id": ""
            }

            var newID = ((amout_of_cabinet + 1) * 60) + 1;
            arr[amout_of_cabinet + 1][0].Id = "" + newID;
            fs.writeFileSync(fil, JSON.stringify(arr, null, 3));
            document.getElementById("select_layout").innerHTML = "";
            document.getElementById("select_layout").parentNode.removeChild(document.getElementById("select_layout"));
            add_containers();
            console.log(database);

        }

    }



}

function change_databas(q) {
    var database = JSON.parse(fs.readFileSync(fil, 'utf8'));
    let change = document.createElement("div");
    change.className = "change";
    change.id = "change"
    document.body.appendChild(change);
    console.log(database);

    database[q].forEach(function(obj, i) {
        var className = document.getElementsByClassName("components")
        var class_id = document.getElementById(className[i].id)
        class_id.addEventListener("click", change)

        function change() {
            made_change = true;
            document.getElementById("change").innerHTML = "";
            database = JSON.parse(fs.readFileSync(fil, 'utf8'));
            console.log(database);
            let add_component = document.createElement("button");
            let placeholder = document.createElement("div");
            let name = document.createElement("div");
            let input_utility = document.createElement("input");
            let input_description = document.createElement("input");
            let input_key = document.createElement("input");
            let save_button = document.createElement("button");
            let remove_button = document.createElement("button");
            placeholder.className = "placeholder_change_databas";
            placeholder.id = "placeholder_change_databas"





            name.className = "name";
            name.id = "name";
            name.innerHTML = database[q][i].utility;

            input_utility.className = "utility_change";
            input_utility.id = "utility_change"
            input_utility.placeholder = "Utility: " + database[q][i].utility;


            input_utility.onclick = function add_utility() {
                if (document.getElementById("utility_change").value.length == 0) {
                    console.log("value");
                    document.getElementById("utility_change").value = database[q][i].utility;
                }
            }

            input_description.className = "description_change";
            input_description.id = "description_change"
            input_description.placeholder = "Description: " + database[q][i].description;
            input_description.onclick = function add_description() {
                if (document.getElementById("description_change").value.length == 0) {
                    console.log("value");
                    document.getElementById("description_change").value = database[q][i].description;
                }
            }

            input_key.className = "key_change";
            input_key.id = "key_change";
            input_key.placeholder = "Keywords: " + database[q][i].keywords;
            input_key.onclick = function add_description() {
                if (document.getElementById("key_change").value.length == 0) {
                    console.log("value");
                    document.getElementById("key_change").value = database[q][i].keywords;
                }
            }

            save_button.className = "save_button";
            save_button.id = "save_button";
            save_button.value = "Save";
            save_button.innerHTML = "Save";
            save_button.onclick = function() {
                var new_utility = document.getElementById("utility_change").value;
                var new_description = document.getElementById("description_change").value;
                var new_key = document.getElementById("key_change").value

                if (new_utility.length > 0 && new_utility != " ") {
                    console.log(new_utility)
                    database[q][i].utility = new_utility;
                }
                if (new_description.length > 0 && new_description != " ") {
                    database[q][i].description = new_description;
                }
                if (new_key.length > 0 && new_key != " ") {
                    var new_key_array = new_key.split(",");
                    database[q][i].keywords = new_key_array;
                }




                fs.writeFileSync(fil, JSON.stringify(database, null, 3));
                var divdata = document.getElementById("data")
                divdata.innerHTML = "";
                made_change = true;
                remove_change()
                add_element(q);

            }
            remove_button.className = "remove_button";
            remove_button.id = "remove_button";
            remove_button.value = "Remove";
            remove_button.innerHTML = "Remove";

            remove_button.onclick = function() {
                database[z].splice(i, 1);
                class_id.parentNode.removeChild(class_id);
                layout = JSON.parse(fs.readFileSync(test, 'utf8'));
                database[z].forEach(function(ele, y) {
                    if (y >= i) {
                        if (layout[0][z] == 1) {
                            var id_minus_1 = Number(ele.Id) - 1;
                            ele.Id = "" + id_minus_1
                        } else if (layout[0][z] == 2) {
                            if (Number(ele.Id) < ((q + 1) * 60) - 30) {
                                var id_minus_1 = Number(ele.Id) - 1;
                                ele.Id = "" + id_minus_1
                            }
                            if (((q + 1) * 60) - 30 <= ele.Id <= ((z + 1) * 60) - 10) {
                                var newID;
                                if (Number(ele.Id) == ((q + 1) * 60) - 30) {
                                    newID = (Number(ele.Id)) - 1;
                                    ele.Id = "" + newID
                                }
                                if (Number(ele.Id) == ((q + 1) * 60) - 29) {
                                    newID = (Number(ele.Id)) - 1;
                                    ele.Id = "" + newID
                                }
                                if (Number(ele.Id) == ((q + 1) * 60) - 27) {
                                    newID = Number(ele.Id) - 2;
                                    ele.Id = "" + newID
                                }
                                if (Number(ele.Id) == ((q + 1) * 60) - 25) {
                                    newID = Number(ele.Id) - 2;
                                    ele.Id = "" + newID
                                }
                                if (Number(ele.Id) == ((q + 1) * 60) - 19) {
                                    newID = Number(ele.Id) - 6;
                                    ele.Id = "" + newID
                                }
                                if (Number(ele.Id) == ((q + 1) * 60) - 17) {
                                    newID = Number(ele.Id) - 2;
                                    ele.Id = "" + newID
                                }
                                if (Number(ele.Id) == ((q + 1) * 60) - 15) {
                                    newID = Number(ele.Id) - 2;
                                    ele.Id = "" + newID
                                }
                                if (Number(ele.Id) == ((q + 1) * 60) - 14) {
                                    newID = Number(ele.Id) - 1;
                                    ele.Id = "" + newID
                                }
                                if (Number(ele.Id) == ((q + 1) * 60) - 12) {
                                    newID = Number(ele.Id) - 2;
                                    ele.Id = "" + newID
                                }
                                if (Number(ele.Id) == ((q + 1) * 60) - 10) {
                                    newID = Number(ele.Id) - 2;
                                    ele.Id = "" + newID
                                }


                            }
                            if (Number(ele.Id) == ((z + 1) * 60) - 2) {
                                var id_minus_1 = Number(ele.Id) - 8;
                                ele.Id = "" + id_minus_1
                            }
                        } else if (layout[0][q] == 3) {
                            if (Number(ele.Id) < ((q + 1) * 60) - 15) {
                                var id_minus_1 = Number(ele.Id) - 1;
                                ele.Id = "" + id_minus_1
                            }
                            if (((q + 1) * 60) - 15 <= ele.Id <= ((q + 1) * 60) + 1) {
                                var newID;
                                if (Number(ele.Id) == ((z + 1) * 60) - 15) {
                                    newID = (Number(ele.Id)) - 1;
                                    ele.Id = "" + newID
                                }
                                if (Number(ele.Id) == ((z + 1) * 60) - 14) {
                                    newID = (Number(ele.Id)) - 1;
                                    ele.Id = "" + newID
                                }
                                if (Number(ele.Id) == ((z + 1) * 60) - 12) {
                                    newID = Number(ele.Id) - 2;
                                    ele.Id = "" + newID
                                }
                                if (Number(ele.Id) == ((z + 1) * 60) - 10) {
                                    newID = Number(ele.Id) - 2;
                                    ele.Id = "" + newID
                                }
                                if (Number(ele.Id) == ((z + 1) * 60) - 4) {
                                    newID = Number(ele.Id) - 6;
                                    ele.Id = "" + newID
                                }
                                if (Number(ele.Id) == ((z + 1) * 60) - 2) {
                                    newID = Number(ele.Id) - 2;
                                    ele.Id = "" + newID
                                }
                                if (Number(ele.Id) == ((z + 1) * 60)) {
                                    newID = Number(ele.Id) - 2;
                                    ele.Id = "" + newID
                                    console.log([y].Id)
                                }
                                console.log(ele.Id);
                            }

                        }


                    }
                })
                fs.writeFileSync(fil, JSON.stringify(database, null, 3));
                var divdata = document.getElementById("data")
                divdata.innerHTML = "";
                made_change = true
                remove_change();
                add_element(q);

            }

            add_component.id = "add_component"
            add_component.innerHTML = "Add component"

            add_component.onclick = function() {
                console.log("test")
                var same_id = obj.Id;

                document.getElementById("change").innerHTML = "";
                add_same_id(q, same_id)


            }


            document.querySelector("#data").appendChild(placeholder);

            document.getElementById("change").appendChild(name);
            document.getElementById("change").appendChild(input_utility);
            document.getElementById("change").appendChild(input_description);
            document.getElementById("change").appendChild(input_key);
            document.getElementById("change").appendChild(save_button);
            document.getElementById("change").appendChild(remove_button);
            document.getElementById("change").appendChild(add_component)

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
        fs.writeFileSync(fil, JSON.stringify(database, null, 3));

        var divdata = document.getElementById("data")
        divdata.innerHTML = "";
        made_change = true
        remove_change();
        add_element(q);
    }
}