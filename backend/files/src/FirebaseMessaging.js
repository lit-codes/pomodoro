var admin = require("firebase-admin");

class FirebaseMessaging {
    constructor(serviceAccount) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://pomodoro-lit-codes.firebaseio.com"
        });
        this.clients = new Set();
    }

    addClient(client) {
        this.clients.add(client);
    }

    async send(message) {
        const tokens = Array.from(this.clients);

        const { responses } = await admin.messaging().sendMulticast({
            data: message,
            tokens,
        });

        responses.forEach((response, i) => {
            if (response.error) {
                this.clients.delete(tokens[i]);
            }
        });

        return responses;
    }
}

module.exports = FirebaseMessaging;