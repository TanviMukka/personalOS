var welcomeScreen = document.querySelector("#window")
var welcomeScreenOpen = document.querySelector("#welcome-open")
var welcomeScreenClose = document.querySelector("#welcome-close")

function time() {
    var time = new Date().toLocaleString();
    var timeText = document.querySelector("#top-bar-time");
    timeText.innerHTML = time;
}

function makeDraggable(element, handle) {
    var initialX = 0;
    var initialY = 0;
    var currentX = 0;
    var currentY = 0;

    handle.onmousedown = function (e) {
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

function openWindow(element) {
    element.style.display = ""
}

function closeWindow(element) {
    element.style.display = "none"
}

setInterval(time, 1000);

makeDraggable(
    document.getElementById("window"), 
    document.getElementById("window-bar")
);

welcomeScreenClose.addEventListener("click", function() {
    closeWindow(welcomeScreen);
});

welcomeScreenOpen.addEventListener("click", function() {
    openWindow(welcomeScreen);
});