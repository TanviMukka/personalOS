var windows = document.querySelectorAll(".window")
var icons = document.querySelectorAll(".desktop-app-image")
var closeCircle = document.querySelectorAll(".close-circle")
var welcomeOpen = document.querySelector("#welcome-open")

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

function iconFor(windowElement) {
    return document.querySelector(`[data-window="${windowElement.id}"]`)
}

function showOnly(windowElement) {
    windows.forEach(function (w) {
        closeWindow(w)
    })

    icons.forEach(function (icon) {
        icon.classList.remove("selected")
    })

    openWindow(windowElement)
    iconFor(windowElement).classList.add("selected")
}

setInterval(time, 1000);

icons.forEach(function (icon) {
    icon.addEventListener("click", function () {
        var target = document.getElementById(icon.dataset.window)
        if (target.style.display === "none") {
            showOnly(target)
        } else {
            closeWindow(target)
            icon.classList.remove("selected")
        }
    })
})

closeCircle.forEach(function (circle) {
    circle.addEventListener("click", function () {
        var win = circle.closest(".window")
        closeWindow(win)
        iconFor(win).classList.remove("selected")
    })
})

windows.forEach (function (w) {
    makeDraggable(w, w.querySelector(".window-bar"))
})

welcomeOpen.addEventListener("click", function () {
    showOnly(document.getElementById("welcome-window"))
})

showOnly(document.getElementById("welcome-window"))