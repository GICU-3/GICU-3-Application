function layout2(q, arr) {

    var first_change = ((amout_of_cabinet + 1) * 60) - 30;
    var second_change = ((amout_of_cabinet + 1) * 60) - 10;
    var maxID = ((amout_of_cabinet + 1) * 60);
}


function display_layout2(obj, w, standard_partern_layout, diffrent_partern_layout, diffrent_partern_layout2) {
    database = JSON.parse(fs.readFileSync(fil, 'utf8'));
    var maxID = ((z + 1) * 60);
    var first_change = ((z + 1) * 60) - 30;
    var second_change = ((z + 1) * 60) - 10;

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
    } else if (obj.Id <= second_change) {
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
    } else if (obj.Id < maxID) {
        if (obj.Id != latest_id) {
            let multi_componets = document.createElement("div");
            multi_componets.className = "components"
            multi_componets.id = obj.Id + "outer"
            multi_componets.draggable = "true"


            let diffrent_partern2 = document.createElement("div");

            diffrent_partern_layout2.id = "diffrent_partern_layout2";
            diffrent_partern_layout2.className = "diffrent_partern_layout2";
            diffrent_partern2.className = "element"



            diffrent_partern2.id = obj.Id;
            latest_id = obj.Id;
            diffrent_partern2.innerHTML = obj.utility;
            if (obj.utility == "") { diffrent_partern2.innerHTML = "-" }
            //standard_partern.draggable = "true";
            amout_of_elements = w;
            document.querySelector("#data").appendChild(diffrent_partern_layout2);
            diffrent_partern_layout2.appendChild(multi_componets)
            multi_componets.appendChild(diffrent_partern2)

        } else if (obj.Id == latest_id) {


            var element_with_same_id = document.getElementById(obj.Id + "outer");




            let diffrent_partern2 = document.createElement("div");



            diffrent_partern_layout2.id = "diffrent_partern_layout2";
            diffrent_partern_layout2.className = "diffrent_partern_layout2";
            diffrent_partern2.className = "element"



            diffrent_partern2.id = obj.Id;
            diffrent_partern2.innerHTML = obj.utility;
            if (obj.utility == "") { diffrent_partern2.innerHTML = "-" }
            //standard_partern.draggable = "true";
            amout_of_elements = w;

            document.querySelector("#data").appendChild(document.getElementById("diffrent_partern_layout2"));
            element_with_same_id.appendChild(diffrent_partern2)
        }
    }
}