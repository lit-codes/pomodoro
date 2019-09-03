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
        document.addEventListener('onblur', () => {this.isActive = false;});
        document.addEventListener('onfocus', () => {this.isActive = true;});

        this.timer.onUpdate = this.onTimerUpdate.bind(this);

        this.forceUpdate();
    }

    onTabSwitch() {
        if(document.hidden) return;
        this.liveStore.reload();
    }

    onStoreUpdate(action, {seconds, type}) {
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
                return this.forceUpdate();
        }
    }

    onTimerUpdate() {
        // render
        this.forceUpdate();
        if (this.isActive) {
            this.liveStore.requestUpdate('tick', { seconds: this.timer.seconds })
        }
    }

    onTypeChange(type) {
        this.timer.setType(type);
        this.liveStore.requestUpdate('type', { type });
        this.forceUpdate();
    }

    start() {
        this.timer.start();
        this.liveStore.requestUpdate('start');
        this.forceUpdate();
    }

    pause() {
        this.timer.pause();
        this.liveStore.requestUpdate('pause');
        this.forceUpdate();
    }

    reset() {
        this.timer.reset();
        this.liveStore.requestUpdate('reset');
        this.forceUpdate();
    }

    render() {
        if (!this.timer) return html`<div>Loading...<//>`;
        return html`<div>
            <${TimeDisplay} time=${this.timer.display}/>
            <${TypeSelector} onTypeChange=${this.onTypeChange.bind(this)} type=${this.timer.type} />
            <!-- Accent-colored raised button with ripple -->
            <button
                class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary"
                onClick=${this.start.bind(this)}
            >
                Start
            </button>
            <button
                class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary"
                onClick=${this.pause.bind(this)}
            >
                Pause
            </button>
            <button
                class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary"
                onClick=${this.reset.bind(this)}
            >
                Reset
            </button>
        </div>`;
    }

}

preact.render(preact.h(App), document.getElementById('app'));
