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
    }

    onTabSwitch() {
        if(document.hidden) return;
        this.liveStore.reload();
    }

    onStoreUpdate({running, seconds}) {
        if (this.timer.running !== running) {
            if (this.timer.running) {
                this.timer.stop();
            } else {
                this.timer.start();
            }
        }
        this.timer.setSeconds(seconds);
    }

    onTimerUpdate() {
        this.setState({time: this.timer.display()});
    }

    render() {
        return html`<div>
            <${TimeDisplay} time=${this.state.time}/>
            <${TypeSelector} />
            <button onClick=${this.reset.bind(this)}>reset</button>
            <button onClick=${this.pause.bind(this)}>pause</button>
            <button onClick=${this.start.bind(this)}>start</button>
        </div>`;
    }

    start() {
        this.liveStore.requestUpdate({ running: true, seconds: this.timer.seconds });
    }

    pause() {
        this.liveStore.requestUpdate({ running: false, seconds: this.timer.seconds });
    }

    reset() {
        this.liveStore.requestUpdate({ running: false, seconds: this.timer.initialSeconds });
    }

}

preact.render(preact.h(App), document.getElementById('app'));
