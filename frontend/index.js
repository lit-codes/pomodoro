import LiveStore from './LiveStore.js';

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

const liveStore = new LiveStore({ messaging, topic });

function generateTopic() {
    return Math.random().toString(36).substring(9);
}

liveStore.onStoreUpdate = function(store) {
    const $message = document.querySelector('#message');
    const $submit = document.querySelector('#submit');
    $message.value = store.message || '';
    $submit.disabled = $message.disabled = false;
};

window.updateStore = function() {
    const $message = document.querySelector('#message');
    const $submit = document.querySelector('#submit');
    const value = $message.value;
    $message.value = 'saving...';
    $submit.disabled = $message.disabled = true;
    liveStore.update({ message: value });
    return false;
}
/*window.onfocus = function() {
    liveStore.reload();
}*/