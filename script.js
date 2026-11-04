// grabs the elements used throughout the script: all windows, all icons, all close buttons, and the 'tanvi's os' label in the top bar
var windows = document.querySelectorAll(".window")
var icons = document.querySelectorAll(".desktop-app-image")
var closeCircle = document.querySelectorAll(".close-circle")
var welcomeOpen = document.querySelector("#welcome-open")

// the list of quotes to choosen from, and the top bar element that shows the current quote
var quotes = ["trust the process", "veni, vedi, vici", "change isn't easy", "make yourself proud", "be the exception", "cherish every moment"];
var quoteText = document.querySelector("#top-bar-quote");

// graduation countdown pill
// months start at 0 in js, so 4 means may; math.ceil rounds up, so a partial day counts as a whole day
var gradCount = new Date(2027, 4, 16);
var daysLeft = Math.ceil((gradCount - new Date()) / (1000 * 60 * 60 * 24));

// updates the clock in the top bar using user's own date and time format
function time() {
    var time = new Date().toLocaleString();
    var timeText = document.querySelector("#top-bar-time");
    timeText.innerHTML = time;
}

// lets a window be dragged by its title bar; 'element' is the window that moves and 'handle' is the part you grab
function makeDraggable(element, handle) {
    // currentX and currentY remember how far the window has been moved
    // initialX and initialY are used to work out the new position while dragging
    var initialX = 0;
    var initialY = 0;
    var currentX = 0;
    var currentY = 0;

    // when the title bar is pressed, this stops the text from being selected, notes where the grab started, and starts following the mouse
    handle.onmousedown = function (e) {
        e.preventDefault();
        initialX = e.clientX - currentX;
        initialY = e.clientY - currentY;
        document.onmousemove = drag;
        document.onmouseup = stopDragging;
    };

    // runs on every mouse move while dragging and moves the window with translate()
    function drag(e) {
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
        element.style.transform = `translate(${currentX}px, ${currentY}px)`;
    }

    // runs when the mouse is released and stops following the mouse
    function stopDragging() {
        document.onmousemove = null;
        document.onmouseup = null;
    }
}

// small helpers to show or hide a window
// setting display to an empty string removes the 'inline display: none', so the window shows again
function openWindow(element) {
    element.style.display = ""
}

function closeWindow(element) {
    element.style.display = "none"
}

// finds the dock icon for a window by matching the icon's data-window attribute to the window's id
function iconFor(windowElement) {
    return document.querySelector(`[data-window="${windowElement.id}"]`)
}

// closes every window, removes the highlight from every icon, then opens the chosen window and highlights its icon
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


// runs the clock once right away so it doesn't say 'time' for the first second
time()
// runs the clock again every 1000 ms (1 second)
setInterval(time, 1000);


// show a pointer cursor and swap in a random quote on click (picking at random can repeat the same quote twice in a row)
quoteText.style.cursor = "pointer";
quoteText.addEventListener("click", function () {
    quoteText.textContent = quotes[Math.floor(Math.random() * quotes.length)];
})

// show the days left in the countdown, and makes sure the counter doesn't go below zero after graduation
document.querySelector("#grad-count").textContent = Math.max(daysLeft, 0);

// each button stores an image path in data-wallpaper, and clicking it sets that image as the page background
document.querySelectorAll(".wallpaper-option").forEach(function (btn) {
    btn.addEventListener("click", function () {
        document.body.style.backgroundImage = `url("${btn.dataset.wallpaper}")`;
    });
});

// each checkbox's data-target is the id of the element it controls (unchecked hides that element, checked shows it again)
document.querySelectorAll(".bar-toggle").forEach(function (box) {
    box.addEventListener("change", function () {
        var target = document.getElementById(box.dataset.target);
        target.style.display = box.checked ? "" : "none";
    });
});

// each button stores a font in data-font, and it's applied to the whole body
// headings and the clock have their own font rule in the css, so they keep the pixel font
document.querySelectorAll(".font-option").forEach(function (btn) {
    btn.addEventListener("click", function () {
        document.body.style.fontFamily = btn.dataset.font;
    })
})

// toggle() with a second argument adds the class when it's true and removes it when it's false
// the css for .small-icons shrinks the dock icons
document.querySelectorAll(".size-option").forEach(function (btn) {
    btn.addEventListener("click", function () {
        document.body.classList.toggle("small-icons", btn.dataset.size === "small");
    });
});

// clearning the inline styles and removing the class lets the stylesheet's original values take over again
document.querySelector("#reset-settings").addEventListener("click", function () {
    document.body.style.backgroundImage = "";
    document.body.style.fontFamily = "";
    document.body.classList.remove("small-icons");

    document.querySelectorAll(".bar-toggle").forEach(function (box) {
        box.checked = true;
        document.getElementById(box.dataset.target).style.display = "";
    });

    document.querySelectorAll(".option").forEach(function (o) {
        o.classList.remove("active");
    });
});

// clicking an icon opens its window and closes the others
// clicking the icon of an open window closes it
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


// (pink circle) closes its window and removes the highlight from its icon
closeCircle.forEach(function (circle) {
    circle.addEventListener("click", function () {
        var win = circle.closest(".window")
        closeWindow(win)
        iconFor(win).classList.remove("selected")
    })
})

// make every window draggable by its title bar
windows.forEach (function (w) {
    makeDraggable(w, w.querySelector(".window-bar"))
})

// when the page loads, it starts with only the welcome window open
showOnly(document.getElementById("welcome-window"))