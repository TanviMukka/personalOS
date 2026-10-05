function time() {
    var time = new Date().toLocaleString();
    var timeText = document.querySelector("#top-bar-time");
    timeText.innerHTML = time;
}
setInterval(time, 1000);

makeDraggable(document.getElementById("window"));

function makeDraggable(element) {
    var initialX = 0;
    var initialY = 0;
    var currentX = 0;
    var currentY = 0;

    element.onmousedown = function (e) {
        e.preventDefault();
        initialX = e.clientX - currentX;
        initialY = e.clientY - currentY;
        document.onmousemove = drag;
        document.onmouseup = stopDragging;
    };

    function drag(e) {
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
        element.style.transform = `translate(${currentX}px, ${currentY}px)`;
    }

    function stopDragging() {
        document.onmousemove = null;
        document.onmouseup = null;
    }
}