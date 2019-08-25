const FirebaseMessaging = require('./FirebaseMessaging');
const serviceAccount = require("./service-account.json");

const messaging = new FirebaseMessaging({
  ...serviceAccount,
  private_key: process.env.PKEY.replace(/\\n/g, "\n"),
});

process.argv.slice(2).forEach(client => messaging.addClient(client));

messaging.send({ key: 'value' })
  .then((responses) => {
    console.log('Successfully sent message:', responses);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });