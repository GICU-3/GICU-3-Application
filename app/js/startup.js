
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
    localStorage.setItem('theme','light');
    console.log("logged light");
  }
    
  });

  //loadingscreen

  setTimeout(() => {
    document.getElementById("loadingscreentext1").style.display = "none";
    document.getElementById("loadingscreentext2").style.display = "inline";
  }, 500);
  setTimeout(() => {
    document.getElementById("loadingscreentext2").style.display = "none";
    document.getElementById("loadingscreentext3").style.display = "inline";
  }, 1000);
  setTimeout(() => {
    document.getElementById("loadingscreentext3").style.display = "none";
    document.getElementById("loadingscreentext4").style.display = "inline";
  }, 1500);
  setTimeout(() => {
    document.getElementById("loadingscreentext4").style.display = "none";
    document.getElementById("navbar").style.display = "flex";
    document.getElementById("bodySection").style.display = "flex";
    document.getElementById("loadingscreen").style.display = "none";
  }, 2000);
}