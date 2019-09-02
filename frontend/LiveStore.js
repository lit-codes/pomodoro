class LiveStore {
    constructor({ topic, messaging, url = '/api' }) {
        this.topic = topic;
        this.messaging = messaging;
        this.url = url;
    }

    async init() {
        await this.reload();
        await this.subscribe();
        this.handleStoreUpdate();
    }

    async reload() {
        const store = await this.get(this.topic);
        return this.updateStore(store || {}, true);
    }

    async get() {
        return idbKeyval.get(this.topic);
    }

    requestUpdate(store) {
        const { topic } = this;

        return this.post('/send', { topic, message: { topic, store } });
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

    handleStoreUpdate() {
        this.messaging.onMessage(({ data: { message } }) => {
            const { topic, store } = JSON.parse(message);
            this.updateStore(store);
        });
    }

    updateStore(store, skipSave) {
        const {topic} = this;
        if (!skipSave) {
            idbKeyval.set(topic, store);
        }
        if (typeof this.onStoreUpdate === 'function') {
            this.onStoreUpdate(store);
        }
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
}

globalThis.LiveStore = LiveStore;