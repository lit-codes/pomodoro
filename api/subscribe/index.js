const messaging = require('../messaging');

module.exports = (req, res) => {
    const { body: { topic, token } } = req;
    messaging.subscribeToTopic(token, topic)
        .then((responses) => {
            res.send('Subscribed successfully');
            console.log(responses);
        })
        .catch((error) => {
            res.send('Something went wrong, check the logs');
            console.log(error);
        });
};

