const FirebaseMessaging = require('./FirebaseMessaging');
const serviceAccount = require("./service-account.json");
const messaging = new FirebaseMessaging({
  ...serviceAccount,
  private_key: process.env.PKEY.replace(/\\n/g, "\n"),
});

module.exports = messaging;