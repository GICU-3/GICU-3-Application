/**
 * The labbar function is used to display the labbar interface.
 * 
 * @return The labbar page
 * @docauthor Trelent
 * @docmodifier Emil Lindén
 */
function labbar() {
    if (there_is_element == true && z != null) { remove_element(); }
    if (there_is_skop == true) { remove_skop(); }
    z = null;
    document.getElementById("selected_cabinet").innerHTML = "";
    document.getElementById("data").style.display = "none";
    document.getElementById("admin_s").style.display = "none";
    document.getElementById("searchbar").style.display = "none";
    document.getElementById("bodySection").style.justifyContent = "right"; //? kanske behöver ändras när divvar läggs till
    document.getElementById("labbarInterface").style.display = "grid";
    document.getElementById("bodySection").style.display = "flex";
    document.getElementById("bookimg").style.filter = "invert(55%) sepia(0%) saturate(0%) hue-rotate(174deg) brightness(91%) contrast(90%)";
    document.getElementById("homeimg").style.filter = "invert(100%) sepia(100%) saturate(100%) hue-rotate(157deg) brightness(100%) contrast(100%)";
    document.getElementById("engineerimg").style.filter = "invert(100%) sepia(100%) saturate(100%) hue-rotate(157deg) brightness(100%) contrast(100%)";
}

/**
 * The home function is used to display the home interface.
 * 
 * @return The home page
 * @docauthor Trelent
 * @docmodifier Emil Lindén
 */
function home() {
    if (there_is_element == true && z != null) { remove_element(); }
    if (there_is_skop == true) { remove_skop(); }
    z = null;
    document.getElementById("selected_cabinet").innerHTML = "";
    document.getElementById("bodySection").style.display = "flex";
    document.getElementById("bodySection").style.justifyContent = "baseline";
    document.getElementById("data").style.display = "none";
    document.getElementById("admin_s").style.display = "none";
    document.getElementById("searchbar").style.display = "block";
    document.getElementById("labbarInterface").style.display = "none";
    document.getElementById("homeimg").style.filter = "invert(55%) sepia(0%) saturate(0%) hue-rotate(174deg) brightness(91%) contrast(90%)";
    document.getElementById("bookimg").style.filter = "invert(100%) sepia(100%) saturate(100%) hue-rotate(157deg) brightness(100%) contrast(100%)";
    document.getElementById("engineerimg").style.filter = "invert(100%) sepia(100%) saturate(100%) hue-rotate(157deg) brightness(100%) contrast(100%)";
}

/**
 * The admin function is used to display the admin interface.
 * 
 * @return The admin section of the labbar
 * @docauthor Trelent
 */
function admin() {
    document.getElementById("bodySection").style.display = "none";
    document.getElementById("labbarInterface").style.display = "none";
    document.getElementById("admin_s").style.display = "block";
    document.getElementById("engineerimg").style.filter = "invert(55%) sepia(0%) saturate(0%) hue-rotate(174deg) brightness(91%) contrast(90%)";
    document.getElementById("homeimg").style.filter = "invert(100%) sepia(100%) saturate(100%) hue-rotate(157deg) brightness(100%) contrast(100%)";
    document.getElementById("bookimg").style.filter = "invert(100%) sepia(100%) saturate(100%) hue-rotate(157deg) brightness(100%) contrast(100%)";
    document.getElementById("admin_s").style.display = "grid";
    settings();
}