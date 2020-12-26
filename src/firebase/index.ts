const firebase = require('firebase-admin');
var serviceAccount = require('./credentials.json');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://julian-auth-development.firebaseio.com',
});

module.exports = firebase;
