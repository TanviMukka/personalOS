function time() {
    var time = new Date().toLocaleString();
    var timeText = document.querySelector("#top-bar-time");
    timeText.innerHTML = time;
}
setInterval(time, 1000);