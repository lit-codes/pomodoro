class LiveStore {
    constructor({ topic, messaging, url = '/api' }) {
        this.topic = topic;
        this.messaging = messaging;
        this.url = url;
        this.id = Math.random().toString(36).substring(2);
    }

    async init() {
        await this.reload();
        await this.subscribe();
        this.handlePushMessage();
    }

    async reload() {
        const store = await this.get(this.topic);
        return this.emitOnStoreUpdate('reload', store);
    }

    async get() {
        return await idbKeyval.get(this.topic) || {};
    }

    async requestUpdate(action, change) {
        const { topic, id } = this;

        const currentStore = await this.get(this.topic);
        const store = {...currentStore, ...change};
        await this.saveToStore(store);

        return this.post('/send', { topic, message: { topic, id, action, store } });
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

    handlePushMessage() {
        this.messaging.onMessage(({ data: { message } }) => {
            const { topic, id, action, store } = JSON.parse(message);
            console.log('update arrived', topic, id, action, store);
            if (id === this.id) return;
            this.saveToStore(store);
            this.emitOnStoreUpdate(action, store);
        });
    }

    saveToStore(store) {
        const {topic} = this;

        idbKeyval.set(topic, store);
    }

    emitOnStoreUpdate(action, store) {
        if (typeof this.onStoreUpdate === 'function') {
            this.onStoreUpdate(action, store);
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
