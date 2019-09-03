class Timer {
    constructor(seconds) {
        this.running = false;
        this.setSeconds(seconds);
        this.type = 'pomodoro-type';
        this.typeToSeconds = {
            'pomodoro-type': 25 * 60,
            'short-break-type': 5 * 60,
            'long-break-type': 10 * 60,
        };
    }

    setSeconds(seconds) {
        this.seconds = seconds;
        this.update();
    }

    start() {
        this.running = true;
        this.countDown = setInterval(() => {
            if (this.seconds === 0) {
                this.reach();
                return this.reset();
            }
            this.seconds--;
            this.update();
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
        this.seconds = this.typeToSeconds[this.type];
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
}

window.Timer = Timer;
