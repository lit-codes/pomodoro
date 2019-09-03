const admin = require('firebase-admin');

class FirebaseMessaging {
    constructor(serviceAccount) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: 'https://pomodoro-lit-codes.firebaseio.com'
        });
        const messaging = admin.messaging();

        this.send = messaging.send.bind(messaging);
        this.sendToTopic = messaging.sendToTopic.bind(messaging);
        this.subscribeToTopic = messaging.subscribeToTopic.bind(messaging);
    }
}

module.exports = FirebaseMessaging;
