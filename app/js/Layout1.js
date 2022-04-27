function layout1(q) {
    change_databas(q);
    var maxID = ((q + 1) * 60);
    if (latest_id < maxID) {
        let new_element = document.createElement("div")
        new_element.className = "new_element";
        new_element.id = "new_element"
        document.querySelector("#data").appendChild(new_element);
        document.getElementById("new_element").innerHTML = "New element";

        document.getElementById(new_element.id).addEventListener("click", element);
    }

    function element() {
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
            var newID = (Number(latest_id)) + 1;
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

function display_layout1(obj, w, standard_partern_layout, diffrent_partern_layout, diffrent_partern_layout2) {
    var maxID = ((z + 1) * 60);

    if (obj.Id <= maxID) {
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
    }
}