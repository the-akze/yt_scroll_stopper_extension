console.log("yt_scroll_stopper_extension script injected");

/*
TODO:

prevent scrolling on yt shorts by having event listener for the following:
- "wheel" event: any wheel event at all
- "click" event on the down or up arrow buttons on the right
- "keydown" event on the up or down arrow keys

*/

let alertContainer = document.createElement("div");
alertContainer.style.display = "flex";
alertContainer.style.flexDirection = "column-reverse";
alertContainer.style.alignItems = "center";
alertContainer.style.position = "fixed";
alertContainer.style.top = "20px";
alertContainer.style.left = "50%";
alertContainer.style.transform = "translateX(-50%)";
alertContainer.style.width = "600px";
alertContainer.style.maxWidth = "95vw";
alertContainer.style.height = "fit-content";
alertContainer.style.zIndex = "99999";
alertContainer.style.fontFamily = "Arial, Helvetica, sans-serif";
alertContainer.style.fontSize = "unset";

// alertContainer.style.outline = "solid 1px red"; // for debugging

document.body.appendChild(alertContainer);

function createAlert(message, disappearAfter = 4000) {
    let newAlert = document.createElement("div");
    newAlert.className = "ytscrollstop-alert";
    newAlert.innerHTML = `<p>${message}</p>`;

    newAlert.style.padding = "10px 20px 10px 20px";
    newAlert.style.backgroundColor = "#ffffff88";
    newAlert.style.backdropFilter = "blur(5px)";
    newAlert.style.margin = "10px";
    newAlert.style.borderRadius = "10px";
    newAlert.style.color = "black";
    newAlert.style.boxShadow = "0px 0px 20px #00000044";
    newAlert.style.textAlign = "center";
    newAlert.style.width = "fit-content";
    newAlert.style.fontFamily = "Arial, Helvetica, sans-serif";
    newAlert.style.fontSize = "unset";

    let newAlertText = newAlert.querySelector("p");
    newAlertText.style.fontFamily = "Arial, Helvetica, sans-serif";
    newAlertText.style.fontSize = "150%";
    newAlertText.style.fontWeight = "unset";

    alertContainer.appendChild(newAlert);

    setTimeout(alertElem => {
        alertElem.remove();
    }, disappearAfter, newAlert);
}

const scrollAlertTimeout = 1000;
let lastScrollEvent = -scrollAlertTimeout;

function handleScrollAlert() {
    if (lastScrollEvent + scrollAlertTimeout < Date.now()) {
        createAlert("Stop scrolling!");
        lastScrollEvent = Date.now();
    }
}


function pageIsYTShorts() {
    return location.pathname.startsWith("/shorts");
}

window.addEventListener("wheel", e => {
    if (!pageIsYTShorts()) return;

    // console.log("wheel event", e);

    handleScrollAlert();
    e.preventDefault();
    return false;
}, {passive: false});

window.addEventListener("click", e => {
    if (!pageIsYTShorts()) return;

    let composedPath = e.composedPath();
    for (let i = 0; i < composedPath.length; i++) {
        const element = composedPath[i];
        if (element.id == "navigation-button-down" || element.id == "navigation-button-up") {
            handleScrollAlert();
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }
    }
}, {passive: false});

window.addEventListener("keydown", e => {
    if (!pageIsYTShorts()) return;

    if (e.key != "ArrowUp" && e.key != "ArrowDown") {
        return;
    }

    handleScrollAlert();
    e.preventDefault();
    e.stopImmediatePropagation();
    return false;
}, {passive: false});