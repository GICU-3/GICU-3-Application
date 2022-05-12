let z = null;
let made_change = false;
var there_is_element;
var there_is_skop;
var latest_id;
var amout_of_elements;
var layout = [];
var fil = 'dat/utilities.json'
var test = 'dat/Layout.json'
var image;
var undo_database = null;

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
    var imgId = 'test'
    var dropZoneId = ''

    function allowDrop(ev) {
        ev.preventDefault();
    }

    function dragTouchstart(e) {
        imgId = e.target
        console.log(imgId.id)
        var try_id = "" + Number(imgId.id)
        if (try_id != "NaN") {
            console.log("problem")
            imgId = imgId.parentNode
            console.log(imgId)
            let tem_div = document.createElement("div"); // Create a new element
            tem_div.setAttribute("id", "image-float");
            tem_div.innerHTML = imgId.innerHTML
            tem_div.style.display = "flex"
            tem_div.style.backgroundColor = "var(--backgroundTheme)";
            tem_div.style.color = "var(--textTheme)"
            tem_div.style.borderRadius = "5px";
            tem_div.style.width = "" + e.target.parentNode.offsetWidth + "px"
            tem_div.style.justifyContent = "space-evenly"
            let left = (e.touches[0].pageX - (e.target.parentNode.offsetWidth / 2));
            let top = (e.touches[0].pageY - (e.target.parentNode.offsetHeight / 2));
            tem_div.style.left = left + 'px';
            tem_div.style.top = top + 'px';
            tem_div.style.opacity = 1;
            e.target.parentNode.style.opacity = 0.5;


            document.body.appendChild(tem_div);
        } else {
            console.log("problem")
            imgId = imgId
            console.log(imgId)
            let tem_div = document.createElement("div"); // Create a new element
            tem_div.setAttribute("id", "image-float");
            tem_div.innerHTML = imgId.innerHTML
            tem_div.style.display = "flex"
            tem_div.style.backgroundColor = "var(--backgroundTheme)";
            tem_div.style.color = "var(--textTheme)"
            tem_div.style.borderRadius = "5px";
            tem_div.style.width = "" + e.target.offsetWidth + "px"
            tem_div.style.justifyContent = "space-evenly"
            let left = (e.touches[0].pageX - (e.target.offsetWidth / 2));
            let top = e.touches[0].pageY - (e.target.offsetHeight / 2);
            tem_div.style.left = left + 'px';
            tem_div.style.top = top + 'px';
            tem_div.style.opacity = 1;
            e.target.style.opacity = 0.5;

            document.body.appendChild(tem_div);
        }
        // position the image to the touch, can be improve to detect the position of touch inside the image

    }

    function dragTouchmove(e) {
        // on touch move or dragging, we get the newly created image element
        let image = document.getElementById('image-float')
            // this will give us the dragging feeling of the element while actually it's a different element
        var try_id = "" + Number(imgId.id)
        if (try_id != "NaN") {
            let left = (e.touches[0].pageX - (e.target.parentNode.offsetWidth / 2));
            let top = (e.touches[0].pageY - (e.target.parentNode.offsetHeight / 2));
            image.style.left = left + 'px';
            image.style.top = top + 'px';
            let touchX = e.touches[0].pageX - (e.target.parentNode.offsetWidth / 2)
            let touchY = e.touches[0].pageY - (e.target.parentNode.offsetHeight / 2)
            dragTouchenter(e, touchX, touchY)
        } else {
            let left = (e.touches[0].pageX - (e.target.offsetWidth / 2));
            let top = e.touches[0].pageY - (e.target.offsetHeight / 2);
            image.style.left = left + 'px';
            image.style.top = top + 'px';
            let touchX = e.touches[0].pageX - (e.target.offsetWidth / 2)
            let touchY = e.touches[0].pageY - (e.target.offsetHeight / 2)
            dragTouchenter(e, touchX, touchY)
        }

        //apply touch enter fucntion inside touch move

    }
    var get = [];
    var statement = true

    function dragTouchenter(e, touchX, touchY) {
        database[z].forEach(function(object, i) {
            if (statement) {
                get[i] = document.getElementById(object.Id + "outer")
                get[i] = get[i].getBoundingClientRect();
                var overlap1 = !(get[i].right < touchX ||
                    get[i].left > touchX ||
                    get[i].bottom < touchY ||
                    get[i].top > touchY)
                if (overlap1) {
                    dropZoneId = document.getElementById(object.Id + "outer")
                }
            }
        })

    }

    function dragTouchend(e) {
        //remove dragged image duplicate
        let image = document.getElementById('image-float')
        image.remove()
        e.target.style.opacity = 1;
        e.target.parentNode.style.opacity = 1;
        //dropZoneId.style.border = "1px solid #0b79d0";
        //if outside any dropzone, just do nothing
        if (dropZoneId == '') {
            dropZoneId = ''
            imgId = ''
        } else {
            if ("" + Number(dropZoneId) == "NaN") {
                console.log(dropZoneId, imgId)
                let toSwap = dropZoneId
                let originDropzone = imgId
                let all_components = document.querySelectorAll(".element")
                console.log(imgId.id, dropZoneId.childNodes[0].id)
                var statement = true
                var temp_id = [];
                for (let i = dropZoneId.childNodes.length; i > 0; i--) {
                    console.log(i)
                    temp_id[i - 1] = dropZoneId.childNodes[i - 1]
                }
                console.log(temp_id)
                for (let i = imgId.childNodes.length; i > 0; i--) {
                    console.log(i)
                    dropZoneId.childNodes[i - 1] = imgId.childNodes[i - 1]
                    originDropzone.appendChild(dropZoneId.childNodes[i - 1])
                }
                console.log(dropZoneId.childNodes[0])
                for (let i = temp_id.length; i > 0; i--) {
                    console.log(i)
                    imgId.childNodes[i - 1] = temp_id[i - 1]
                    toSwap.appendChild(imgId.childNodes[i - 1])
                }
                for (let i = dropZoneId.childNodes.length; i > 0; i--) {
                    console.log(i)
                    temp_id[i - 1] = dropZoneId.childNodes[i - 1].id
                }
                console.log(temp_id)
                for (let i = imgId.childNodes.length; i > 0; i--) {
                    console.log(i)
                    dropZoneId.childNodes[i - 1].id = imgId.childNodes[i - 1].id
                }
                console.log(dropZoneId.childNodes[0])
                for (let i = temp_id.length; i > 0; i--) {
                    console.log(i)
                    imgId.childNodes[i - 1].id = temp_id[i - 1]
                }
                database[z].forEach(function(obj, i) {
                    if (obj.Id == imgId.childNodes[0].id) {
                        obj.Id = dropZoneId.childNodes[0].id
                    } else if (obj.Id == dropZoneId.childNodes[0].id) {
                        obj.Id = imgId.childNodes[0].id
                    }
                })

                database[z].sort(function(a, b) {
                    return a.Id - b.Id || a.utility.localeCompare(b.utility);
                });
                fs.writeFileSync(fil, JSON.stringify(database, null, 3));

                document.getElementById("navigation_database_save").style.display = "block";
                document.getElementById("navigation_database_undo").style.display = "block";
                change_databas(z);
                temp_id = ''
                dropZoneId = ''
                imgId = ''
                try_id = null

            }
        }


    }

    function dragEnter(ev) {
        var element = document.getElementById(ev.target.id);
        /* element.style.border = "dotted";
         element.style.borderColor = "#0b79d0";*/
    }

    function dragLeave(ev) {
        var element = document.getElementById(ev.target.id);
        //element.style.border = "1px solid #0b79d0";
    }

    function dragStart(ev) {
        ev.dataTransfer.setData("src", ev.target.id);
        var number = ev.target.id.replace(/[^\d.]/g, '');
        ev.dataTransfer.setData("text/plain", number);
    }

    function drop(ev) {
        ev.preventDefault();
        var src = document.getElementById(ev.dataTransfer.getData("src"));

        /* var srcParent = src.childNodes;
         var tgt = ev.currentTarget.childNodes;
         console.log(tgt, srcParent)
         ev.currentTarget.replaceChild(srcParent, tgt);
         src.appendChild(tgt);*/
        var temp_id = [];
        for (let i = src.childNodes.length; i > 0; i--) {
            console.log(i)
            temp_id[i - 1] = src.childNodes[i - 1]
        }
        console.log(temp_id)
        for (let i = ev.currentTarget.childNodes.length; i > 0; i--) {
            console.log(i)
            src.childNodes[i - 1] = ev.currentTarget.childNodes[i - 1]
            ev.currentTarget.appendChild(src.childNodes[i - 1])
        }
        for (let i = temp_id.length; i > 0; i--) {
            console.log(i)
            ev.currentTarget.childNodes[i - 1] = temp_id[i - 1]
            src.appendChild(ev.currentTarget.childNodes[i - 1])
        }
        var temp_id = [];
        for (let i = src.childNodes.length; i > 0; i--) {
            console.log(i)
            temp_id[i - 1] = src.childNodes[i - 1].id
        }
        console.log(temp_id)
        for (let i = ev.currentTarget.childNodes.length; i > 0; i--) {
            console.log(i)
            src.childNodes[i - 1].id = ev.currentTarget.childNodes[i - 1].id
        }
        for (let i = temp_id.length; i > 0; i--) {
            console.log(i)
            ev.currentTarget.childNodes[i - 1].id = temp_id[i - 1]
        }
        database[z].forEach(function(obj, i) {
            if (obj.Id == ev.currentTarget.childNodes[0].id) {
                obj.Id = src.childNodes[0].id
            } else if (obj.Id == src.childNodes[0].id) {
                obj.Id = ev.currentTarget.childNodes[0].id
            }
        })

        database[z].sort(function(a, b) {
            return a.Id - b.Id || a.utility.localeCompare(b.utility);
        });
        fs.writeFileSync(fil, JSON.stringify(database, null, 3));

        document.getElementById("navigation_database_save").style.display = "block";
        document.getElementById("navigation_database_undo").style.display = "block";
        change_databas(z);
        temp_id = ''
    }


    let items = document.querySelectorAll('.components');
    items.forEach(function(item) {
        item.addEventListener("dragover", allowDrop)
        item.addEventListener("drop", drop)
        item.addEventListener("dragenter", dragEnter)
        item.addEventListener("dragleave", dragLeave)
        item.addEventListener("dragstart", dragStart)
        item.addEventListener("touchstart", dragTouchstart)
        item.addEventListener("touchmove", dragTouchmove)
        item.addEventListener("touchstart", dragTouchstart)
        item.addEventListener("touchend", dragTouchend)
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

                    obj.Id = "" + (Number(obj.Id) + (drdropid - dragSrcEl.id) * 60)
                })
                database[drdropid].forEach(function(obj, i) {
                    obj.Id = "" + (Number(obj.Id) - (drdropid - dragSrcEl.id) * 60)
                })
            } else if (dragSrcEl.id > drdropid) {
                database[drdropid].forEach(function(obj, i) {

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

        this.style.opacity = '1';

        items.forEach(function(item) {
            item.classList.remove('over');
        });


        fs.writeFileSync(fil, JSON.stringify(database, null, 3))
        fs.writeFileSync(test, JSON.stringify(layout, null, 3))


    }


    let items = document.querySelectorAll('.skop');
    items.forEach(function(item) {

        item.addEventListener('dragstart', handleDragStart, false);
        item.addEventListener('dragenter', handleDragEnter, false);
        item.addEventListener('dragover', handleDragOver, false);
        item.addEventListener('dragleave', handleDragLeave, false);
        item.addEventListener('drop', handleDrop, false);
        item.addEventListener('dragend', handleDragEnd, false);
    });


}

function add_element(q) {
    document.querySelector(".navbar").style.display = "none";
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
    layout = JSON.parse(fs.readFileSync(test, 'utf8'));

    let diffrent_partern_layout = document.createElement("div");
    let standard_partern_layout = document.createElement("div");
    let diffrent_partern_layout2 = document.createElement("div");

    let navigation_database_1 = document.createElement("div");
    let navigation_database_con = document.createElement("div");
    let navigation_database_2 = document.createElement("div");
    let navigation_database_arrow = document.createElement("a")
    let navigation_database_name = document.createElement("a")

    let navigation_database_save = document.createElement("div")
    let navigation_database_undo = document.createElement("div")

    navigation_database_save.id = "navigation_database_save";
    navigation_database_save.innerHTML = "Save"

    navigation_database_undo.id = "navigation_database_undo";
    navigation_database_undo.innerHTML = "Undo"


    navigation_database_arrow.id = "navigation_database_arrow"
    navigation_database_name.id = "navigation_database_name"
    navigation_database_arrow.innerHTML = "❮ "
    navigation_database_name.innerHTML = layout[1][z];
    navigation_database_1.id = "navigation_database_1"
    navigation_database_2.id = "navigation_database_2"
    navigation_database_con.id = "navigation_database_con"

    document.querySelector("body").insertBefore(navigation_database_con, document.querySelector("body").firstChild);
    navigation_database_con.appendChild(navigation_database_1)
    navigation_database_con.appendChild(navigation_database_2)
    navigation_database_1.appendChild(navigation_database_arrow);
    navigation_database_1.appendChild(navigation_database_name);
    navigation_database_2.appendChild(navigation_database_save)
    navigation_database_2.appendChild(navigation_database_undo)

    if (made_change) {
        document.getElementById("navigation_database_save").style.display = "block";
        document.getElementById("navigation_database_undo").style.display = "block";
        made_change = false;
    }

    database[q].forEach(function(obj, w) {
        database = JSON.parse(fs.readFileSync(fil, 'utf8'));
        if (layout[0][q] == 1) { display_layout1(obj, w, standard_partern_layout, diffrent_partern_layout, diffrent_partern_layout2); }
        if (layout[0][q] == 2) { display_layout2(obj, w, standard_partern_layout, diffrent_partern_layout, diffrent_partern_layout2); }
        if (layout[0][q] == 3) { display_layout3(obj, w, standard_partern_layout, diffrent_partern_layout, diffrent_partern_layout2); }
    })
    change_databas(q);
    window.onclick = function(event) {
            if (event.target == navigation_database_arrow) {
                var check_save_undo = document.getElementById("navigation_database_save").style.display;
                console.log(check_save_undo)
                if (check_save_undo == "") {
                    navigation_database_con.parentNode.removeChild(navigation_database_con)
                    remove_element();
                    add_containers();
                    document.querySelector(".navbar").style.display = "flex";
                    document.getElementById("admin_s").style.display = "grid";
                } else { showAlert_db("Vad fan gör du? Spara databasen!", "warning", 5000); }
            }
        }
        /*console.log(undo_database, database)
        if (database == undo_database) {
            console.log("Change has been made")
        }*/
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
            let button_change_name = document.createElement("button")

            button_change_name.id = "button_change_name"
            button_change_name.innerHTML = "Change name"
            selected_cabinet.id = "selected_cabinet";
            select_cabinet_change_name.id = "select_cabinet_change_name"
            select_cabinet_change_name.placeholder = layout[1][q]
            select_cabinet_open_button.id = "select_cabinet_open_button"
            select_cabinet_open_button.innerHTML = "Open"
            select_cabinet_remove.id = "select_cabinet_remove"
            select_cabinet_remove.innerHTML = "Remove"
            select_cabinet.innerHTML = cl[q].id

            document.querySelector("#selected_cabinet").appendChild(select_cabinet_change_name)
            document.querySelector("#selected_cabinet").appendChild(select_cabinet_open_button)
            document.querySelector("#selected_cabinet").appendChild(select_cabinet_remove)
            document.querySelector("#selected_cabinet").appendChild(button_change_name)

            document.getElementById("button_change_name").onclick = function() {
                if (select_cabinet_change_name.value != "") {
                    layout[1][q] = select_cabinet_change_name.value
                    fs.writeFileSync(test, JSON.stringify(layout, null, 3));
                    document.getElementById("selected_cabinet").innerHTML = "";
                    remove_skop();
                    add_containers();

                } else {
                    showAlert_db("Vad fan gör du? Ange ett namn!", "warning", 5000);
                }
            }


            document.getElementById("select_cabinet_open_button").onclick = function() {
                document.getElementById("admin_s").innerHTML = "";
                document.getElementById("selected_cabinet").innerHTML = "";
                chose();
            }
            document.getElementById("select_cabinet_remove").onclick = function() {
                database.splice(q, 1);
                layout[0].splice(q, 1)
                layout[1].splice(q, 1);

                fs.writeFileSync(test, JSON.stringify(layout, null, 3));
                database.forEach(function(obj, i) {
                    if (i >= q) {

                        database[i].forEach(function(element, x) {
                            element.Id = "" + (Number(element.Id) - 60)
                        })
                    }
                })
                fs.writeFileSync(fil, JSON.stringify(database, null, 3));
                document.getElementById("selected_cabinet").innerHTML = "";
                document.getElementById("admin_s").innerHTML = "";
                add_containers();
            }
            drag_cabinets();
        }

        function chose() {
            undo_database = JSON.parse(fs.readFileSync(fil, 'utf8'));
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
    let placeholder_select_layout_background = document.createElement("div")
    let placeholder_select_layout = document.createElement("div")
    let placeholder_layout_1 = document.createElement("img");
    let placeholder_layout_2 = document.createElement("img");
    let placeholder_layout_3 = document.createElement("img");
    placeholder_select_layout_background.id = "placeholder_select_layout"
    placeholder_select_layout.className = "layout";
    placeholder_select_layout.id = "select_layout"
    placeholder_layout_1.className = "layout1";
    placeholder_layout_1.id = "layout_1";
    placeholder_layout_1.src = "../app/img/layout_1.png"
    placeholder_layout_1.style.width = "20%"
    placeholder_layout_1.style.borderRadius = "5px";
    placeholder_layout_1.style.marginLeft = "5px"
    placeholder_layout_2.className = "layout2";
    placeholder_layout_2.id = "layout_2";
    placeholder_layout_2.src = "../app/img/layout_2.png"
    placeholder_layout_2.style.width = "20%"
    placeholder_layout_2.style.borderRadius = "5px";
    placeholder_layout_2.style.marginLeft = "5px"
        //placeholder_layout_2.style.filter = "invert(100%)"
    placeholder_layout_3.className = "layout3";
    placeholder_layout_3.id = "layout_3";
    placeholder_layout_3.src = "../app/img/layout_3.png"
    placeholder_layout_3.style.width = "20%"
    placeholder_layout_3.style.borderRadius = "5px";
    placeholder_layout_3.style.marginLeft = "5px"


    document.querySelector("#admin_s").appendChild(placeholder_select_layout_background);
    placeholder_select_layout_background.appendChild(placeholder_select_layout);
    placeholder_select_layout.appendChild(cabinet_name);
    placeholder_select_layout.appendChild(placeholder_layout_1);
    placeholder_select_layout.appendChild(placeholder_layout_2);
    placeholder_select_layout.appendChild(placeholder_layout_3);

    document.getElementById(new_skop.id).addEventListener("click", new_cabinet)

    function new_cabinet() {
        placeholder_select_layout_background.style.display = "block";
        //document.getElementById("selected_cabinet").innerHTML = "";


        window.onclick = function(event) {
            if (event.target == placeholder_select_layout_background) {
                placeholder_select_layout_background.style.display = "none";
            }
        }

        document.getElementById("layout_1").onclick = function() {
            layout = JSON.parse(fs.readFileSync(test, 'utf8'));

            if (document.getElementById("cabinet_name").value == "") { showAlert_db("Vad fan gör du? Ange ett namn!", "warning", 5000); } else {

                if (amout_of_cabinet == 0) {
                    layout[0][amout_of_cabinet] = 1;
                    layout[1][amout_of_cabinet] = document.getElementById("cabinet_name").value;
                    var arr = Array.from(Array(1), () => new Array());
                    console.log("it happend")
                    amout_of_cabinet = -1;
                } else {
                    layout[0][amout_of_cabinet + 1] = 1;
                    layout[1][amout_of_cabinet + 1] = document.getElementById("cabinet_name").value;
                    var arr = Array.from(Array(amout_of_cabinet + 2), () => new Array());
                }

                fs.writeFileSync(test, JSON.stringify(layout, null, 3));

                database.forEach(function(obj, i) {
                    arr[i] = database[i]
                    database[i].forEach(function(object, x) {
                        latest_id = object.Id;
                    })
                })

                var latest_id = ((amout_of_cabinet + 1) * 60);

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
                document.getElementById("admin_s").innerHTML = "";

                //document.getElementById("select_layout").parentNode.removeChild(document.getElementById("select_layout"));
                add_containers();

            }
        }
        document.getElementById("layout_2").onclick = function() {
            layout = JSON.parse(fs.readFileSync(test, 'utf8'));
            if (document.getElementById("cabinet_name").value == "") { showAlert_db("Vad fan gör du? Ange ett namn!", "warning", 5000); } else {
                if (amout_of_cabinet == 0) {
                    layout[0][amout_of_cabinet] = 2;
                    layout[1][amout_of_cabinet] = document.getElementById("cabinet_name").value;
                    var arr = Array.from(Array(1), () => new Array());
                    console.log("it happend")
                    amout_of_cabinet = -1;
                } else {
                    layout[0][amout_of_cabinet + 1] = 2;
                    layout[1][amout_of_cabinet + 1] = document.getElementById("cabinet_name").value;
                    var arr = Array.from(Array(amout_of_cabinet + 2), () => new Array());
                }

                fs.writeFileSync(test, JSON.stringify(layout, null, 3));

                database.forEach(function(obj, i) {
                    arr[i] = database[i]
                    database[i].forEach(function(object, x) {
                        latest_id = object.Id;
                    })
                })
                var first_change = ((amout_of_cabinet + 2) * 60) - 30;

                var second_change = ((amout_of_cabinet + 2) * 60) - 10;

                var latest_id = ((amout_of_cabinet + 1) * 60);

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
                document.getElementById("admin_s").innerHTML = "";
                //document.getElementById("select_layout").parentNode.removeChild(document.getElementById("select_layout"));
                add_containers();

            }
        }
        document.getElementById("layout_3").onclick = function() {

            layout = JSON.parse(fs.readFileSync(test, 'utf8'));
            if (document.getElementById("cabinet_name").value == "") { showAlert_db("Vad fan gör du? Ange ett namn!", "warning", 5000); } else {
                if (amout_of_cabinet == 0) {
                    layout[0][amout_of_cabinet] = 3;
                    layout[1][amout_of_cabinet] = document.getElementById("cabinet_name").value;
                    var arr = Array.from(Array(1), () => new Array());
                    console.log("it happend")
                    amout_of_cabinet = -1;
                } else {
                    layout[0][amout_of_cabinet + 1] = 3;
                    layout[1][amout_of_cabinet + 1] = document.getElementById("cabinet_name").value;
                    var arr = Array.from(Array(amout_of_cabinet + 2), () => new Array());
                }

                fs.writeFileSync(test, JSON.stringify(layout, null, 3));

                database.forEach(function(obj, i) {
                    arr[i] = database[i]
                    database[i].forEach(function(object, x) {
                        latest_id = object.Id;
                    })
                })

                var first_change = ((amout_of_cabinet + 2) * 60) - 15;

                var latest_id = ((amout_of_cabinet + 1) * 60);

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
                document.getElementById("admin_s").innerHTML = "";
                //document.getElementById("select_layout").parentNode.removeChild(document.getElementById("select_layout"));
                add_containers();
            }
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

    var clas = document.querySelectorAll(".components")
    var elem = document.querySelectorAll(".element")
    var save = document.getElementById("navigation_database_save")
    var undo = document.getElementById("navigation_database_undo")

    save.addEventListener("click", function save_db() {
        navigation_database_con.parentNode.removeChild(navigation_database_con)
        fs.writeFileSync(fil, JSON.stringify(database, null, 3));
        var divdata = document.getElementById("data")
        divdata.innerHTML = "";
        add_element(q);
        drag();
    })
    undo.addEventListener("click", function undo_db() {
        navigation_database_con.parentNode.removeChild(navigation_database_con)
        fs.writeFileSync(fil, JSON.stringify(undo_database, null, 3));
        var divdata = document.getElementById("data")
        divdata.innerHTML = "";
        add_element(q);
        drag();
    })
    clas.forEach(function(obj, i) {

        var className = document.getElementsByClassName("components")
        var class_id = document.getElementById(className[i].id);


        class_id.addEventListener("click", change)

        function change() {
            document.getElementById("change_placeholder").style.display = "block";
            document.getElementById("change").innerHTML = "";
            database = JSON.parse(fs.readFileSync(fil, 'utf8'));
            window.onclick = function(event) {
                if (event.target == change_placeholder) {
                    change_placeholder.style.display = "none";
                    window.onclick = function(event) {
                        if (event.target == navigation_database_arrow) {
                            var check_save_undo = document.getElementById("navigation_database_save").style.display;
                            console.log(check_save_undo)
                            if (check_save_undo == "") {
                                navigation_database_con.parentNode.removeChild(navigation_database_con)
                                remove_element();
                                add_containers();
                                document.querySelector(".navbar").style.display = "flex";
                                document.getElementById("admin_s").style.display = "grid";
                            } else { showAlert_db("Vad fan gör du? Spara databasen!", "warning", 5000); }
                        }
                    }
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
                    let chose_image = document.createElement("select")
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

                            document.getElementById(input_description.id).value = p.description;
                        }
                    }

                    input_key.className = "key_change" + k;
                    input_key.id = "key_change" + k;
                    input_key.placeholder = "Keywords: " + database[q][g].keywords;
                    input_key.onclick = function add_description() {
                        if (document.getElementById(input_key.id).value.length == 0) {

                            document.getElementById(input_key.id).value = database[q][g].keywords;
                        }
                    }


                    chose_image.id = "chose_image"
                    let images = [{
                        "name": "Resistor",
                        "icon": "../app/img/icons/resistor.jpg"
                    }, {
                        "name": "Led",
                        "icon": "../app/img/icons/led.jpg"
                    }, {
                        "name": "Transistor",
                        "icon": "../app/img/icons/transistor.jpg"
                    }, {
                        "name": "IC-krets",
                        "icon": "../app/img/icons/ic.jpg"
                    }, {
                        "name": "Diod",
                        "icon": "../app/img/icons/diode.jpg"
                    }, {
                        "name": "Kondensator",
                        "icon": "../app/img/icons/kondensator.jpg"
                    }, {
                        "name": "Miscellaneous",
                        "icon": "../app/img/icons/miscellaneous.jpg"
                    }, {
                        "name": "Motor",
                        "icon": "../app/img/icons/motor.jpg"
                    }, {
                        "name": "Sensor",
                        "icon": "../app/img/icons/sensor.jpg"
                    }, {
                        "name": "Speaker",
                        "icon": "../app/img/icons/speker.jpg"
                    }];
                    let what_icon = null;
                    images.forEach(function(obj, i) {
                        let image_option = document.createElement("option")
                        image_option.value = obj.icon
                        image_option.innerHTML = obj.name
                        console.log(images[i].icon)
                        if (database[q][g].icon == images[i].icon) {
                            what_icon = i;
                        }
                        chose_image.appendChild(image_option)

                    })
                    if (what_icon == null) {
                        chose_image.selectedIndex = -1;

                    } else { chose_image.selectedIndex = what_icon; }


                    chose_image.onclick = function() {
                        var select = document.getElementById("chose_image");
                        var option = select.options[select.selectedIndex].value;
                        image = option;
                        console.log(option);
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

                            database[q][g].utility = new_utility;
                        }
                        if (new_description.length > 0 && new_description != " ") {
                            database[q][g].description = new_description;
                        }
                        if (new_key.length > 0 && new_key != " ") {
                            database[q][g].keywords = new_key;
                        }
                        if (image != undefined) {
                            database[q][g].icon = image;
                        }

                        document.getElementById("navigation_database_arrow").parentNode.parentNode.remove()


                        fs.writeFileSync(fil, JSON.stringify(database, null, 3));
                        var divdata = document.getElementById("data")
                        divdata.innerHTML = "";
                        made_change = true;
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



                    remove_button.onclick = function() {
                        database[z].splice(g, 1);
                        class_id.parentNode.removeChild(class_id);
                        layout = JSON.parse(fs.readFileSync(test, 'utf8'));
                        document.getElementById("navigation_database_arrow").parentNode.remove()


                        fs.writeFileSync(fil, JSON.stringify(database, null, 3));
                        var divdata = document.getElementById("data")
                        divdata.innerHTML = "";
                        made_change = true
                        add_element(q);
                        drag();

                    }

                    add_component.id = "add_component" + k
                    add_component.innerHTML = "Add component"

                    add_component.onclick = function() {
                        var same_id = p.Id;
                        document.getElementById("navigation_database_arrow").parentNode.remove()
                        document.getElementById("change").innerHTML = "";
                        add_same_id(q, same_id)


                    }

                    document.getElementById("change").appendChild(name);
                    document.getElementById("change").appendChild(input_utility);
                    document.getElementById("change").appendChild(input_description);
                    document.getElementById("change").appendChild(input_key);
                    document.getElementById("change").appendChild(chose_image);
                    document.getElementById("change").appendChild(save_button);
                    if (not_the_sameid) { document.getElementById("change").appendChild(remove_button); }
                    document.getElementById("change").appendChild(add_component)


                    k = k + 1;
                }

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
    document.querySelector("#change").appendChild(name_new);
    document.querySelector("#change").appendChild(name_new_button);

    name_new_button.onclick = function() {

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

        database[q][amout_of_elements + 1].Id = "" + newID;
        database[q][amout_of_elements + 1].utility = "" + newComponent_name
        database[q].sort(function(a, b) {
            return a.Id - b.Id || a.utility.localeCompare(b.utility);
        });
        fs.writeFileSync(fil, JSON.stringify(database, null, 3));
        document.getElementById("navigation_database_save").parentNode.parentNode.remove()
        var divdata = document.getElementById("data")
        divdata.innerHTML = "";
        made_change = true
        add_element(q);
        drag();
    }
}

function showAlert_db(message, type, closeDelay) {
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