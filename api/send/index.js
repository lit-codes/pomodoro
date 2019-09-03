const messaging = require('../messaging');

module.exports = (req, res) => {
    const { body: {topic, notification, message} } = req;
    const payload = {};

    if (notification) payload.notification = notification;
    if (message) payload.data = { message: JSON.stringify(message) };

    messaging.sendToTopic(topic, payload)
        .then(() => {
            res.send('message sent successfully');
        })
        .catch((error) => {
            res.send('Something went wrong, check the logs');
            console.log(error);
        });
};

