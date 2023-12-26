// CLOCK
function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    // let s = today.getSeconds();
    m = checkTime(m);
    // s = checkTime(s);
    document.getElementById('clock').innerHTML =  h + ":" + m;
    setTimeout(startTime, 1000);
  }
  
  function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }

// TIMER
function timerDecrement() {
  var time1 = document.getElementById('timer').innerHTML;
  if (time1 != 1) {
    time1--;
    document.getElementById('timer').innerHTML = time1;
    setTimeout(timerDecrement, 1000);
  }
  else {
    document.getElementById('timer').innerHTML = "Timer done."
  }
}

// FULLSCREEN
function openFullscreen() {
  var element = document.documentElement;
  if (element.requestFullscreen) {
        element.requestFullscreen()
  }
}

document.addEventListener("fullscreenchange", function() {
  var output = document.getElementById("navbar");
  if (document.fullscreenElement) {
    output.style.display = "none";
  }
  else {
    output.style.display = "block";
  }
})