/**
 * The startup function is called when the page loads.
 * It is devided into two parts.
 * Part 1:
 * Savestate darkmode reads the 'theme' value from 'localStorage' https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
 * Part 2:
 * Is used to hide elements on the loading page that are not needed until later, and to display elements that need to be shown immediately.
 * 
 * @return Nothing
 * @docauthor Trelent
 * @docmodifier Emil Lindén
 */
function startup() {
  //savestate darkmode
  const themeSwitch = document.querySelector('input');
  console.log(localStorage.getItem('theme'));
  if (localStorage.getItem('theme') == 'dark') {
    console.log("logged darkmode from memory");
    document.body.classList.toggle('dark-theme');
    themeSwitch.checked = true;
  }
  themeSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark-theme');
    console.log(checkedValue);
    if (checkedValue) {
      localStorage.setItem('theme', 'dark'); //localStorage
      console.log("logged dark");
    } else {
      localStorage.setItem('theme', 'light');
      console.log("logged light");
    }
  });


  setTimeout(() => {
    document.getElementById("loadingscreentext1").style.opacity = "0%";
    document.getElementById("loadingscreentext2").style.opacity = "100%";
  }, 500);
  setTimeout(() => {
    document.getElementById("loadingscreentext2").style.opacity = "0%";
    document.getElementById("loadingscreentext3").style.opacity = "100%";
  }, 1000);
  setTimeout(() => {
    document.getElementById("loadingscreentext3").style.opacity = "0%";
    document.getElementById("loadingscreentext4").style.opacity = "100%";
  }, 1500);
  setTimeout(() => {
    document.getElementById("loadingscreentext4").style.opacity = "0%";
    document.getElementById("navbar").style.display = "flex";
    document.getElementById("bodySection").style.display = "flex";
    document.getElementById("loadingscreen").style.display = "none";
  }, 2000);
}