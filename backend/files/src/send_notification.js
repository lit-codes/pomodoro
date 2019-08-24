var admin = require("firebase-admin");

var serviceAccount = require("./service-account.json");

admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          databaseURL: "https://pomodoro-lit-codes.firebaseio.com"
});
// This registration token comes from the client FCM SDKs.
var registrationToken = 'crOZ_DGTVu4:APA91bEbd45doHYcD4kxwO7zK_vnI96e_N0eLzB-lS-dDH-vpK9Bc8I5Xj_wSPSaJ4MRttL-CAC4GaVQUjy7e_P9aqt3vL324uOKqMt7NbuiFuK8aLxdnwtyHXw1wHCjb0eKKEOW5szv';

var message = {
  data: {
    score: '850',
    time: '2:45'
  },
  token: registrationToken
};

// Send a message to the device corresponding to the provided
// registration token.
setInterval(() => {
admin.messaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });

}, 4000);
