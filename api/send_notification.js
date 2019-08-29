const FirebaseMessaging = require('./FirebaseMessaging');
const serviceAccount = require("./service-account.json");
const express = require('express');

const messaging = new FirebaseMessaging({
  ...serviceAccount,
  private_key: process.env.PKEY.replace(/\\n/g, "\n"),
});

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
const port = 3000;

app.post('/subscribe', ({body: {topic, token}}, res) => {
   messaging.subscribeToTopic(topic, token)
        .then((responses) => {
	    res.send('Subscribed successfully');
		console.log(responses);
        })
        .catch((error) => {
	    res.send('Something went wrong, check the logs');
            console.log(error);
        });
});

app.post('/send', ({body: {topic, message}}, res) => {
    messaging.sendToTopic(topic, message)
        .then((responses) => {
	    res.send('message sent successfully');
        })
        .catch((error) => {
	    res.send('Something went wrong, check the logs');
            console.log(error);
        });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
