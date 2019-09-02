const messaging = require('../messaging');

module.exports = (req, res) => {
    const { body: { topic, message } } = req;
    messaging.sendToTopic(topic, { message: JSON.stringify(message) })
        .then((responses) => {
            res.send('message sent successfully');
        })
        .catch((error) => {
            res.send('Something went wrong, check the logs');
            console.log(error);
        });
};

