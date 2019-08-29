const FirebaseMessaging = require('../FirebaseMessaging');
const serviceAccount = require("../service-account.json");
const messaging = new FirebaseMessaging({
  ...serviceAccount,
  private_key: process.env.PKEY.replace(/\\n/g, "\n"),
});

module.exports = (req, res) => {
	const {body: {topic, token}} = req;
   messaging.subscribeToTopic(topic, token)
        .then((responses) => {
	    res.send('Subscribed successfully');
		console.log(responses);
        })
        .catch((error) => {
	    res.send('Something went wrong, check the logs');
            console.log(error);
        });
};

