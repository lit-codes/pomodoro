const {google} = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/firebase.messaging'];

const private_key = process.env.PKEY.replace(/\\n/g, "\n");

function getAccessToken() {
        return new Promise(function(resolve, reject) {
                var key = require('./service-account.json');
                var jwtClient = new google.auth.JWT(
                        key.client_email,
                        null,
                        private_key,
                        SCOPES,
                        null
                );
                jwtClient.authorize(function(err, tokens) {
                        if (err) {
                                reject(err);
                                return;
                        }
                        resolve(tokens.access_token);
                });
        });
}

getAccessToken().then(console.log, console.log);
