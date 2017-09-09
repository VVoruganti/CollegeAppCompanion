var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jquery = require('jquery');
var $ = jquery;
var request = require('request');
var cors = require('cors')

var admin = require("firebase-admin");

var serviceAccount = require("serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://test-project-e424f.firebaseio.com"
});




/* var admin = require("firebase-admin");

var db = admin.database();
var ref = db.ref("server/saving-data/fireblog"); */


app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
var busboy = require("connect-busboy");
app.use(busboy());
app.use(cors());



app.use('/static', express.static('static'))

app.get('/', function(req, res){
  res.sendfile('./welcome.html');
});

app.get('/login', function(req, res) {
    res.sendfile('./login.html');
})

app.get('/test', function(req, res) {
    res.sendfile('./test.html');
})




app.get("/main", function(req, res) {
    res.sendfile("./main.html");
});

app.post('/main', function(req, res) {
    console.log(req.body);
   // $.post("https://rest.nexmo.com/sms/json",, (data, status, xhr) => {console.log(data)});
    
    request.post('https://rest.nexmo.com/sms/json', {form:{
        "api_key": "3763e1cc",
        "api_secret": "6efbe39cd7742b20",
        "to": req.body.phone,
        "from": "12016441506",
        "text": "Hello " + req.body.name + "! Welcome to collegeapp.io's text messaging notification service! Please note standard sms fees apply."
    }
  }, function(err,httpResponse,body){ console.log(body) });

  res.sendfile("./main.html");
})

app.post('/addcollege', function(req, res) {
    console.log(req.body);
});

app.listen(3000)

