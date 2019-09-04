let topic = document.location.hash.split('#')[1];

if (!topic) {
    topic = generateTopic();
    document.location.hash = topic;
}

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA-cl-Ly_JyTs5QdTOjNKZnYsfZeI0B7SU",
    authDomain: "pomodoro-lit-codes.firebaseapp.com",
    databaseURL: "https://pomodoro-lit-codes.firebaseio.com",
    projectId: "pomodoro-lit-codes",
    storageBucket: "",
    messagingSenderId: "373119630380",
    appId: "1:373119630380:web:25e1146cb81bbb5c"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

const $timer = document.querySelector('#timer');

function generateTopic() {
    return Math.random().toString(36).substring(9);
}

class App extends preact.Component {
    componentDidMount() {
        this.liveStore = new LiveStore({ messaging, topic });
        this.liveStore.init();
        this.timer = new Timer(25 * 60);

        this.liveStore.onStoreUpdate = this.onStoreUpdate.bind(this);

        document.addEventListener('visibilitychange', this.onTabSwitch.bind(this));

        this.timer.onUpdate = this.onTimerUpdate.bind(this);
        this.timer.onReach = this.onTimerReach.bind(this);

        setInterval(this.sendUpdate.bind(this), 10000);

        this.forceUpdate();
    }

    sendUpdate() {
        this.liveStore.requestUpdate('tick', {
            startTime: this.timer.startTime,
            passedTime: this.timer.passedTime,
            type: this.timer.type,
            running: this.timer.running,
        });
    }

    onTabSwitch() {
        if(document.hidden) return;
        this.liveStore.reload();
    }

    onStoreUpdate(action, {startTime, type, running, passedTime}) {
        if (type !== undefined) this.timer.setType(type);

        if (passedTime !== undefined) this.timer.setPassedTime(passedTime);

        if (startTime !== undefined) this.timer.setStartTime(startTime);

        if (running !== undefined) this.timer.setRunning(running);

        return this.forceUpdate();
    }

    onTimerUpdate() {
        this.sendUpdate();
        // render
        this.forceUpdate();
    }

    onTimerReach() {
        this.liveStore.sendNotification({
            title: 'Pomodoro',
            body: 'Time is up!',
            clickAction: document.location.toString(),
        });
    }

    onTypeChange(type) {
        this.timer.setType(type);
        this.reset();
    }

    start() {
        this.timer.start();
    }

    pause() {
        this.timer.pause();
    }

    reset() {
        this.timer.reset();
    }

    render() {
        if (!this.timer) return html`<div>Loading...<//>`;
        return html`<div class="container">
            <div class="row center-align">
                <h1>
                    <${TimeDisplay} time=${this.timer.display}/>
                </h1>
            </div>
            <div class="row center-align">
                <${TypeSelector} onTypeChange=${this.onTypeChange.bind(this)} type=${this.timer.type} />
            </div>
            <div class="row center-align">
                <button
                    class="waves-effect waves-light btn-small"
                    onClick=${this.start.bind(this)}
                >
                    Start
                </button>
                <button
                    class="waves-effect waves-light btn-small"
                    onClick=${this.pause.bind(this)}
                >
                    Pause
                </button>
                <button
                    class="waves-effect waves-light btn-small"
                    onClick=${this.reset.bind(this)}
                >
                    Reset
                </button>
            </div>
            <div class="row center-align">
                <img src="https://chart.googleapis.com/chart?cht=qr&chs=177x177&chld=H&chl=${document.location.toString().replace('#', '%23')}" />
            </div>
        </div>`;
    }

}

preact.render(preact.h(App), document.getElementById('app'));
