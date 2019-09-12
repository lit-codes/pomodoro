class Timer {
    constructor(liveStore) {
        this.liveStore = liveStore;
        this.liveStore.onStoreUpdate = this.onStoreUpdate.bind(this);
    }

    onStoreUpdate(oldStore, newStore) {
        if (!!oldStore.running === !!newStore.running) return this.update();
        if (this.isReached()) return this.update();

        if (newStore.running) {
            this.startCountDown();
        } else {
            this.stopCountDown();
        }

        this.update();
    }

    startCountDown() {
        if (this.countDown) return;

        this.countDown = setInterval(() => {
            this.isReached();
            this.update();
        }, 1000);
    }

    isReached() {
        if (this.seconds > 0) return false;

        this.reach();
        this.reset();

        return true;
    }

    stopCountDown() {
        clearInterval(this.countDown);
        this.countDown = undefined;
    }

    async start() {
        await this.updateStore({
            running: true,
            startTime: this.passedTime ? (this.now - this.passedTime) : this.now,
        });

        this.startCountDown();

        this.update();
    }

    async pause() {
        await this.updateStore({
            running: false,
            passedTime: this.now - this.startTime,
        });

        this.stopCountDown();

        this.update();
    }

    async reset() {
        this.stopCountDown();
        await this.updateStore({
            running: false,
            startTime: 0,
            passedTime: 0,
        });

        this.update();
    }

    async setType(type) {
        this.stopCountDown();
        await this.updateStore({
            running: false,
            startTime: 0,
            passedTime: 0,
            type,
        });

        this.update();
    }

    async setTypeToSeconds(type, seconds) {
        await this.updateStore({
            typeToSeconds: {
                ...this.typeToSeconds,
                [type]: seconds,
            }
        });

        this.update();
    }

    async resetTypeToSeconds() {
        await this.updateStore({
            typeToSeconds: {
                'pomodoro': 25 * 60,
                'short-break': 5 * 60,
                'long-break': 10 * 60,
            }
        });

        this.update();
    }

    update() {
        if (typeof this.onUpdate === 'function') {
            this.onUpdate();
        }
    }

    reach() {
        this.liveStore.sendNotification({
            title: 'Pomodoro',
            body: 'Time is up!',
            clickAction: document.location.toString(),
        });
    }

    async updateStore(change) {
        return this.liveStore.requestUpdate(change);
    }

    get display() {
        const date = new Date();

        date.setMinutes(this.seconds/60);
        date.setSeconds(this.seconds%60);

        return date.toString().match(/\d{2}:(\d{2}:\d{2})/)[1];
    }

    get now() {
        return parseInt((new Date().getTime())/1000, 10);
    }

    get seconds() {
        const oneCycleInSeconds = this.typeToSeconds[this.type];

        let result;
        if (this.running) {
            result = oneCycleInSeconds - (this.now - this.startTime);
        } else {
            result = oneCycleInSeconds - this.passedTime;
        }

        return result >= 0 && result <= oneCycleInSeconds ? result : 0;
    }

    get store() {
        return this.liveStore.store;
    }

    get startTime() {
        return this.liveStore.store.startTime || 0;
    }

    get passedTime() {
        return this.liveStore.store.passedTime || 0;
    }

    get type() {
        return this.liveStore.store.type || 'pomodoro';
    }

    get running() {
        return this.liveStore.store.running || false;
    }

    get typeToSeconds() {
        return this.liveStore.store.typeToSeconds || {
            'pomodoro': 25 * 60,
            'short-break': 5 * 60,
            'long-break': 10 * 60,
        };
    }
}