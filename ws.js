let urlCallback;

self.addEventListener("install", () => {
    self.skipWaiting();
});

self.addEventListener("push", (event) => {
    const data = event.data ? event.data.json() : {};
    urlCallback = data.data.url;
    event.waitUntil(self.registration.showNotification(data.title, data));
});

self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    event.waitUntil(openUrl(urlCallback));
});

/**
 * Open the URL or focus on the already open page
 * @param {string} url
 **/
async function openUrl(url) {
    const windowClients = await self.clients.matchAll({
        type: "window",
        includeUncontrolled: true,
    });
    for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url === url && "focus" in client) {
            return client.focus();
        }
    }
    if (self.clients.openWindow) {
        return self.clients.openWindow(url);
    }
    return null;
}
