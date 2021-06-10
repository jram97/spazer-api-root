var admin = require("firebase-admin");

var serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

const connect = () =>
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://spazer-21fdf.firebaseio.com"
    });

console.log("firebase");
module.exports = { connect };