// CLOCK
function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    // let s = today.getSeconds();
    m = checkTime(m);
    // s = checkTime(s);
    document.getElementById('time').innerHTML =  h + ":" + m;
    setTimeout(startTime, 1000);
  }
  
  function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }


// Fullscreen
var element = document.documentElement;
function openFullscreen() {
    if (element.requestFullscreen) {
        element.requestFullscreen()
    }
}


var output = document.getElementById("navbar");
document.addEventListener("fullscreenchange", function() {
  if (document.fullscreenElement) {
    output.style.display = "none";
  }
  else {
    output.style.display = "block";
  }
})