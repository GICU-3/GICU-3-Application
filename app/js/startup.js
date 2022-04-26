
function startup() { //runs 1 time each startup, or more specifically when body is loaded
  
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
    localStorage.setItem('theme','light');
    console.log("logged light");
  }
    
  });

  //loadingscreen scuffed solution, loading screen not important for functionality so let be

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