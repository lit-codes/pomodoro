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
        this.startTime = startTime;
    }

    setPassedTime(passedTime) {
        this.passedTime = passedTime;
    }

    setType(type) {
        this.type = type;
    }

    setRunning(running) {
        if (!!this.running === !!running) return;

        if (this.running) {
            this.pause();
        } else {
            this.start();
        }
    }

    start() {
        if (this.running) return;
        if (this.passedTime) {
            this.setStartTime(this.now - this.passedTime)
        } else {
            this.setStartTime(this.now);
        }
        this.running = true;
        this.countDown = setInterval(() => {
            if (this.seconds === 0) {
                this.reach();
                this.reset();
            }
            this.update();
        }, 1000);
    }

    pause() {
        if (!this.running) return;
        this.running = false;
        this.passedTime = this.now - this.startTime;
        clearInterval(this.countDown);
        this.update();
    }

    reset() {
        clearInterval(this.countDown);
        this.running = false;
        this.startTime = 0;
        this.passedTime = 0;
        this.update();
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
        if (this.running) {
            return oneCycleInSeconds - (this.now - this.startTime);
        } else {
            return oneCycleInSeconds - (this.passedTime || 0);
        }
    }
}

window.Timer = Timer;
