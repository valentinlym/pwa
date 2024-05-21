let registration;
let subscription;
function main() {
    // Demande des permisions de notifictions à l'utilisateur
    const permision = document.getElementById("permision");
    if (!permision) {
        // Échec si les prérequis ne sont pas présent
        console.log("Les prérequis ne sont pas présent");
        return;
    }
    permision.addEventListener("click", askPermission);
}
async function askPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
        registerServiceWorker();
    }
}

async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register("/sw.js");
    subscription = await registration.pushManager.getSubscription();
    if (!subscription) {
        subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey:
                "BOZ1q4MPDpJvVsCmvdM0hJV2sizCFKR-Ea46f8HrHd726nmznGL8VSrOd_ZM2y3kgc9pz3tZ4yhdDk_bRHNVLV8",
        });
        sendSubscriptionToBackEnd(subscription);
    }
}

function sendSubscriptionToBackEnd(subscription) {
    console.log(subscription);
    return fetch("https://172.20.10.3:8000/api/save-subscription/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email: "admin@admin.com", subscription}),
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Bad status code from server.");
        }

        return response.json();
    });
}

main();
