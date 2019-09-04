// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-messaging.js');
importScripts('https://cdn.jsdelivr.net/npm/idb-keyval@3/dist/idb-keyval-iife.min.js');
importScripts('/frontend/LiveStore.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
    'messagingSenderId': '373119630380'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function({notification, data}) {
    if (notification) {
        return self.registration.showNotification(notification.title, {
            body: notification.body,
        });
    } else {
        const { topic, store } = JSON.parse(data.message);

        const liveStore = new LiveStore({ messaging, topic });

        liveStore.saveToStore(store);

        return new Promise(() => {});
    }
});

