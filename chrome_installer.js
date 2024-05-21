let deferredPrompt;

document.addEventListener("DOMContentLoaded", function () {
    const isChrome = navigator.userAgent.includes("Chrome");
    const isPWA =
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone;

    // If the user is using Chrome and the app is not running as a PWA, display the installBox
    if (isChrome && !isPWA) {
        document.getElementById("installBox").style.display = "flex";
    }
});

// Add an event listener for the beforeinstallprompt event
window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallPromotion();
});

// Function to show the install promotion
function showInstallPromotion() {
    const installButton = document.getElementById("installButton");
    installButton.style.display = "block";
    installButton.addEventListener("click", handleInstallButtonClick);
}

// Function to handle the install button click event
function handleInstallButtonClick() {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
            console.log("User accepted the install prompt");
        } else {
            console.log("User dismissed the install prompt");
        }
        deferredPrompt = null;
    });
}

// Check if the service worker API is available in the current browser
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker.register("/ws.js").then(
            function (registration) {
                console.log(
                    "ServiceWorker registration successful with scope: ",
                    registration.scope
                );
            },
            function (err) {
                console.log("ServiceWorker registration failed: ", err);
            }
        );
    });
}
