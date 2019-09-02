const admin = require('firebase-admin');

class FirebaseMessaging {
    constructor(serviceAccount) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: 'https://pomodoro-lit-codes.firebaseio.com'
        });
        this.clients = new Set();
    }

    async send(message, options = {}) {
        return admin.messaging().send({
            data: message,
            ...options,
        });
    }

    async sendToClients(clients, message) {
        return admin.messaging().sendMulticast({
            data: message,
            tokens: clients,
        });
    }

    async sendToTopic(topic, message) {
        return admin.messaging().sendToTopic(topic, {
            data: message,
        });
    }

    async subscribeToTopic(topic, client) {
        return admin.messaging().subscribeToTopic(client, topic);
    }
}

module.exports = FirebaseMessaging;
