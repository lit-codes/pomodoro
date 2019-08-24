var admin = require("firebase-admin");

var serviceAccount = require("./service-account.json");

serviceAccount.private_key = process.env.PKEY.replace(/\\n/g, "\n");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pomodoro-lit-codes.firebaseio.com"
});

// This registration token comes from the client FCM SDKs.
var registrationToken = process.argv[2];

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
