self.addEventListener("install", () => {
    self.skipWaiting();
});

self.addEventListener("push", function (event) {
    console.log("Push message received.");
    let notificationTitle = "Bonjour";
    const notificationOptions = {
        body: "Thanks for sending this push msg.",
        icon: "./image.png",
        badge: "./image2.png",
        data: {
            url: "https://web.dev/push-notifications-overview/",
        },
    };

    if (event.data) {
        const dataText = event.data.text();
        notificationTitle = "Test Push Notification";
        notificationOptions.body = `${dataText}`;
    }

    event.waitUntil(
        self.registration.showNotification(
            notificationTitle,
            notificationOptions
        )
    );
});
