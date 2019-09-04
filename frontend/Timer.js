class Timer {
    constructor(seconds) {
        this.running = false;
        this.startTime = 0;
        this.type = 'pomodoro-type';
        this.typeToSeconds = {
            'pomodoro-type': 25 * 60,
            'short-break-type': 5 * 60,
            'long-break-type': 10 * 60,
        };
    }

    setStartTime(startTime) {
        if (startTime === this.startTime) return;
        if (this.startTime !== 0 && startTime !== 0) return;
        this.startTime = startTime || this.now;
        this.update();
    }

    start() {
        this.setStartTime();
        this.running = true;
        this.countDown = setInterval(() => {
            this.update();
            if (this.seconds === 0) {
                this.reach();
                this.reset();
            }
        }, 1000);
    }

    pause() {
        this.running = false;
        clearInterval(this.countDown);
    }


    setType(type) {
        this.type = type;
        this.reset();
    }

    setRunning(running) {
        if (!!this.running === !!running) return;

        if (this.running) {
            this.stop();
        } else {
            this.start();
        }
    }

    reset() {
        this.pause();
        this.startTime = 0;
    }

    update() {
        if (typeof this.onUpdate === 'function') {
            this.onUpdate();
        }
    }

    reach() {
        if (typeof this.onReach === 'function') {
            this.onReach();
        }
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
        if (this.startTime === 0) return oneCycleInSeconds;

        return oneCycleInSeconds - (this.now - this.startTime);
    }
}

window.Timer = Timer;
