export default class Pomodoro {
    constructor({ topic, messaging, url = '/api' }) {
        this.topic = topic;
        this.messaging = messaging;
        this.url = url;
        this.store = { key: 'value' };

        this.subscribe();
        this.handleStoreUpdate();
    }

    async subscribe() {
        const { messaging, topic } = this;
        return new Promise((resolve, reject) => {
            // Initialize Firebase
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    messaging.getToken().then((token) => {
                        if (token) {
                            this.post('/subscribe', { token, topic }).then(resolve).catch(reject);
                        } else {
                            reject('No Instance ID token available. Request permission to generate one.');
                        }
                    }).catch((err) => {
                        reject('An error occurred while retrieving token. ', err);
                    });
                } else {
                    reject('Unable to get permission to notify.');
                }
            });
        });
    }

    post(path, data) {
        const { url } = this;
        return fetch(`${url}${path}`, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }

    async send() {
        const { topic, store } = this;
        return this.post('/send', { topic, message: { topic, store } });
    }

    handleStoreUpdate() {
        this.messaging.onMessage(({ data: { message } }) => {
            const { topic, store } = JSON.parse(message);
            idbKeyval.set(topic, store);
        });
    }
}