import Pomodoro from './Pomodoro.js';

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

const pomodoro = new Pomodoro({ messaging, topic });

function generateTopic() {
    return Math.random().toString(36).substring(9);
}

window.updateStore = function() {
    const $message = document.querySelector('#message');
    pomodoro.store.message = $message.value;
    $message.value = '';
    pomodoro.send({ key: 'message' });
    return false;
}