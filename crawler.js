var admin = require("firebase-admin");

var serviceAccount = require("serviceAccountKey.json");

var firebase = require("firebase");
var express = require('express');
var app = express();


var defaultApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://test-project-e424f.firebaseio.com"
});

var request = require("request");

var database = defaultApp.database()
var cors = require('cors')
app.use(cors());


function dataScrape() {

  database.ref().once('value').then(function(dataSnapshot) {
    data = dataSnapshot.exportVal();
  //  if(!data[users]) return;
    Object.keys(data.users).forEach((k) => {
          if(data.users[k].colleges) {
              Object.keys(data.users[k].colleges).forEach((k2) => {
                  if((typeof data.users[k].colleges[k2].deadline) === 'string' && data.users[k].colleges[k2].deadline != "") {
                      date = new Date(data.users[k].colleges[k2].deadline);
                      var timeDiff = Math.abs(date - new Date());
                      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
                      console.log(diffDays);
                      if(diffDays === 7 || diffDays === 1) {
                          request.post('https://rest.nexmo.com/sms/json', {form:{
                            "api_key": "3763e1cc",
                            "api_secret": "6efbe39cd7742b20",
                            "to": data.users[k].phone_number,
                            "from": "12016441506",
                            "text": "Just a reminder that you only have " + diffDays + (diffDays == 1 ? " day " : " days " ) + "until your " + data.users[k].colleges[k2].name + " application is due!!! Get motivated!!"
                        } 
                      });
                    }
              };
          });
         
      }
    });
  });

}



dataScrape();
setTimeout(dataScrape, 8.64e+7);

function massText() {

}


function isDateValid(d) {
      if ( Object.prototype.toString.call(d) === "[object Date]" ) {
      // it is a date
      if ( isNaN( d.getTime() ) ) {  // d.valueOf() could also work
        return false;
      }
      else {
        return true;
      }
    }
    else {
      return false;
    }
}
