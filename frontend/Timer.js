class Timer {
    constructor(seconds) {
        this.initialSeconds = seconds;
        this.running = false;
        this.setSeconds(seconds);
    }

    setSeconds(seconds) {
        this.seconds = seconds;
        this.update();
    }

    start() {
        this.running = true;
        this.countDown = setInterval(() => {
            if (this.seconds === 0) return this.stop();
            this.seconds--;
            this.update();
        }, 1000);
    }

    stop() {
        this.running = false;
        clearInterval(this.countDown);
    }

    update() {
        if (typeof this.onUpdate === 'function') {
            this.onUpdate();
        }
    }

    display() {
        const date = new Date();

        date.setMinutes(this.seconds/60);
        date.setSeconds(this.seconds%60);

        return date.toString().match(/\d{2}:(\d{2}:\d{2})/)[1];
    }
}

window.Timer = Timer;
