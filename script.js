var welcomeScreen = document.querySelector("#window")
var welcomeScreenOpen = document.querySelector("#welcome-open")
var welcomeScreenClose = document.querySelector("#welcome-close")
var mainIcon = document.querySelector("#main-menu-app")

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

function toggleWindow(windowElement, icon) {
    if (windowElement.style.display === "none") {
        openWindow(windowElement)
        icon.classList.add("selected")
    } else {
        closeWindow(windowElement)
        icon.classList.remove("selected")
    }
}

setInterval(time, 1000);

mainIcon.classList.add("selected")

welcomeScreenClose.addEventListener("click", function() {
    closeWindow(welcomeScreen)
    mainIcon.classList.remove("selected")
});

welcomeScreenOpen.addEventListener("click", function() {
    openWindow(welcomeScreen)
    mainIcon.classList.add("selected")
});

mainIcon.addEventListener("click", function() {
    toggleWindow(welcomeScreen, mainIcon)
});