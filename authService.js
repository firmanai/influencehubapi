const admin = require('firebase-admin');
const { initializeApp } = require('firebase-admin/app');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-firebase-project-id.firebaseio.com',
});

const auth = admin.auth();

module.exports = auth;