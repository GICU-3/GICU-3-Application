
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
    document.getElementById("data").style.display = "none";
    document.getElementById("admin_s").style.display = "none";
    document.getElementById("searchbar").style.display = "none";
    document.getElementById("bodySection").style.justifyContent = "right"; //kanske behöer ändras när divvar läggs till
    document.getElementById("labbarInterface").style.display = "grid";
    document.getElementById("bodySection").style.display = "flex";
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
    document.getElementById("bodySection").style.display = "flex";
    document.getElementById("bodySection").style.justifyContent = "baseline";
    document.getElementById("data").style.display = "none";
    document.getElementById("admin_s").style.display = "none";
    document.getElementById("searchbar").style.display = "block";
    document.getElementById("labbarInterface").style.display = "none";
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
    settings();
}