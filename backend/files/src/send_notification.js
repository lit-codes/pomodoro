const FirebaseMessaging = require('./FirebaseMessaging');
const serviceAccount = require("./service-account.json");

const messaging = new FirebaseMessaging({
  ...serviceAccount,
  private_key: process.env.PKEY.replace(/\\n/g, "\n"),
});

process.argv.slice(2).forEach(client => messaging.addClient(client));

// Send a message to the device corresponding to the provided
// registration token.
setInterval(() => {
  messaging.send({ key: 'value' })
    .then((responses) => {
      // Response is a message ID string.
      console.log('Successfully sent message:', responses);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    });
}, 4000);
