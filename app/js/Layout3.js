function layout3(q, standard_partern_layout, diffrent_partern_layout, ) {
    change_databas(q);
    var first_change = ((q + 1) * 60) - 15;
    var maxID = ((q + 1) * 60);
    let new_element1 = document.createElement("div")
    new_element1.className = "new_element";
    new_element1.id = "new_element"
    standard_partern_layout.appendChild(new_element1);
    new_element1.innerHTML = "New element";
    document.querySelector("#data").appendChild(new_element1);
    if (latest_id < first_change) {
        document.getElementById(new_element1.id).onclick = function() {
            database = JSON.parse(fs.readFileSync(fil, 'utf8'));
            let new_element_holder = document.createElement("div")
            let name_new_component = document.createElement("input")
            let name_new_component_button = document.createElement("button")
            name_new_component.id = "name_new_component"
            name_new_component.placeholder = "Name of component"
            name_new_component_button.id = "name_new_component_button"
            new_element_holder.id = "holder"
            name_new_component_button.innerHTML = "Save name"
            document.querySelector("#data").appendChild(new_element_holder);
            new_element_holder.appendChild(name_new_component);
            new_element_holder.appendChild(name_new_component_button);
            document.getElementById(name_new_component_button.id).onclick = function() {
                var newComponent_name;
                if (document.getElementById("name_new_component").value != null) {
                    newComponent_name = document.getElementById("name_new_component").value;
                }

                if (latest_id < maxID) {
                    database[q][amout_of_elements + 1] = {
                        "utility": "",
                        "icon": "images\\template.jpg",
                        "description": "description",
                        "keywords": "keyword",
                        "favourite": "false",
                        "number": "1",
                        "Id": ""
                    }
                    var newID;
                    if (latest_id < first_change) { newID = (Number(latest_id)) + 1; }
                    console.log(Number(latest_id));
                    database[q][amout_of_elements + 1].Id = "" + newID;
                    database[q][amout_of_elements + 1].utility = "" + newComponent_name
                    fs.writeFileSync(fil, JSON.stringify(database, null, 3));
                }
                remove_change();
                add_element(q);
                drag();
                console.log(database);
            }
        }
    } else if (latest_id < maxID) {
        document.getElementById(new_element1.id).onclick = function() {
            database = JSON.parse(fs.readFileSync(fil, 'utf8'));

            if (latest_id < maxID) {
                database[q][amout_of_elements + 1] = {
                    "utility": "",
                    "icon": "images\\template.jpg",
                    "description": "description",
                    "keywords": "keyword",
                    "favourite": "false",
                    "number": "1",
                    "Id": ""
                }
                var newID;
                if (latest_id == ((q + 1) * 60) - 15) { newID = (Number(latest_id)) + 1; }
                if (latest_id == ((q + 1) * 60) - 14) { newID = (Number(latest_id)) + 2; }
                if (latest_id == ((q + 1) * 60) - 12) { newID = (Number(latest_id)) + 2; }
                if (latest_id == ((q + 1) * 60) - 10) { newID = (Number(latest_id)) + 6; }
                if (latest_id == ((q + 1) * 60) - 4) { newID = (Number(latest_id)) + 2; }
                if (latest_id == ((q + 1) * 60) - 2) { newID = (Number(latest_id)) + 2; }

                console.log(Number(latest_id));
                database[q][amout_of_elements + 1].Id = "" + newID;
                database[q][amout_of_elements + 1].utility = "Name" + newID
                fs.writeFileSync(fil, JSON.stringify(database, null, 3));
            }
            remove_change();
            add_element(q);
            drag();


        }


    }





}

function display_layout3(obj, w, standard_partern_layout, diffrent_partern_layout, diffrent_partern_layout2) {
    var maxID = ((z + 1) * 60);
    var first_change = ((z + 1) * 60) - 15;

    if (obj.Id <= first_change) {
        if (obj.Id != latest_id) {
            let multi_componets = document.createElement("div");
            multi_componets.className = "components"
            multi_componets.id = obj.Id + "outer"
            multi_componets.draggable = "true"


            let standard_partern = document.createElement("div");

            standard_partern_layout.id = "standard_partern_layout";
            standard_partern_layout.className = "standard_partern_layout";
            standard_partern.className = "element"



            standard_partern.id = obj.Id;
            latest_id = obj.Id;
            standard_partern.innerHTML = obj.utility;
            if (obj.utility == "") { standard_partern.innerHTML = "-" }
            //standard_partern.draggable = "true";
            amout_of_elements = w;
            document.querySelector("#data").appendChild(standard_partern_layout);
            standard_partern_layout.appendChild(multi_componets)
            multi_componets.appendChild(standard_partern)

        } else if (obj.Id == latest_id) {


            var element_with_same_id = document.getElementById(obj.Id + "outer");




            let standard_partern = document.createElement("div");


            standard_partern_layout.id = "standard_partern_layout";
            standard_partern_layout.className = "standard_partern_layout";
            standard_partern.className = "element"



            standard_partern.id = obj.Id;
            standard_partern.innerHTML = obj.utility;
            if (obj.utility == "") { standard_partern.innerHTML = "-" }
            //standard_partern.draggable = "true";
            amout_of_elements = w;

            document.querySelector("#data").appendChild(document.getElementById("standard_partern_layout"));
            element_with_same_id.appendChild(standard_partern)
        }
    } else if (obj.Id <= maxID) {
        if (obj.Id != latest_id) {
            let multi_componets = document.createElement("div");
            multi_componets.className = "components"
            multi_componets.id = obj.Id + "outer"
            multi_componets.draggable = "true"


            let diffrent_partern = document.createElement("div");

            diffrent_partern_layout.id = "diffrent_partern_layout";
            diffrent_partern_layout.className = "diffrent_partern_layout";
            diffrent_partern.className = "element"



            diffrent_partern.id = obj.Id;
            latest_id = obj.Id;
            diffrent_partern.innerHTML = obj.utility;
            if (obj.utility == "") { diffrent_partern.innerHTML = "-" }
            //standard_partern.draggable = "true";
            amout_of_elements = w;
            document.querySelector("#data").appendChild(diffrent_partern_layout);
            diffrent_partern_layout.appendChild(multi_componets)
            multi_componets.appendChild(diffrent_partern)

        } else if (obj.Id == latest_id) {


            var element_with_same_id = document.getElementById(obj.Id + "outer");




            let diffrent_partern = document.createElement("div");



            diffrent_partern_layout.id = "diffrent_partern_layout";
            diffrent_partern_layout.className = "diffrent_partern_layout";
            diffrent_partern.className = "element"



            diffrent_partern.id = obj.Id;
            diffrent_partern.innerHTML = obj.utility;
            if (obj.utility == "") { diffrent_partern.innerHTML = "-" }
            //standard_partern.draggable = "true";
            amout_of_elements = w;

            document.querySelector("#data").appendChild(document.getElementById("diffrent_partern_layout"));
            element_with_same_id.appendChild(diffrent_partern)
        }
    }
}