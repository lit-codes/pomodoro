const express = require('express');
const bodyParser = require('body-parser');

const send = require('./send');
const subscribe = require('./subscribe');

const app = express();
app.use(bodyParser.json())
app.use(express.static('./'))
const port = 3000;

app.post('/api/send', send)
app.post('/api/subscribe', subscribe)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
