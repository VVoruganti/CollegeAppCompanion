var admin = require("firebase-admin");

var serviceAccount = require("serviceAccountKey.json");

var firebase = require("firebase");

var defaultApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://test-project-e424f.firebaseio.com"
});

var database = defaultApp.database()

function dataScrape() {

  database.ref().once('value').then(function(dataSnapshot) {

    console.log(dataSnapshot.val());
  });

}

dataScrape()

function massText() {

}
