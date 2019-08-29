const FirebaseMessaging = require('./FirebaseMessaging');
const serviceAccount = require("./service-account.json");
const messaging = new FirebaseMessaging({
  ...serviceAccount,
  private_key: process.env.PKEY.replace(/\\n/g, "\n"),
});

module.exports = (req, res) => {
	const {body: {topic, message}} = req;
    messaging.sendToTopic(topic, message)
        .then((responses) => {
	    res.send('message sent successfully');
        })
        .catch((error) => {
	    res.send('Something went wrong, check the logs');
            console.log(error);
        });
};

