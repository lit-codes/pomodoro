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

        this.forceUpdate();

        setInterval(() => {
            if (!this.waitBeforeSendUpdate--) {
                this.liveStore.requestUpdate('tick', { seconds: this.timer.seconds });
                this.waitBeforeSendUpdate = 5;
            }
        }, 1000);
    }

    onTabSwitch() {
        if(document.hidden) return;
        this.liveStore.reload();
    }

    onStoreUpdate(action, {seconds, type, running}) {
        switch(action) {
            case 'start':
                this.timer.start();
                return this.forceUpdate();
            case 'pause':
                this.timer.pause();
                return this.forceUpdate();
            case 'reset':
                this.timer.reset();
                return this.forceUpdate();
            case 'tick' :
                this.timer.setSeconds(seconds);
                return this.forceUpdate();
            case 'type' :
                this.timer.setType(type);
                return this.forceUpdate();
            case 'reload':
                if (type) this.timer.setType(type);
                if (seconds) this.timer.setSeconds(seconds);
                if (running !== 'undefined') this.timer.setRunning(running);
                return this.forceUpdate();
        }
    }

    onTimerUpdate() {
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
        this.liveStore.requestUpdate('type', { type, running: false, seconds: this.timer.seconds });
        this.forceUpdate();
    }

    start() {
        this.timer.start();
        this.liveStore.requestUpdate('start', {running: true});
        this.forceUpdate();
    }

    pause() {
        this.timer.pause();
        this.liveStore.requestUpdate('pause', {running: false});
        this.forceUpdate();
    }

    reset() {
        this.timer.reset();
        this.liveStore.requestUpdate('reset', {running: false});
        this.forceUpdate();
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
