var http = require("http")
var Pusher = require('pusher');
var bodyParser = require('body-parser');
//var azure = require('azure');
var gcm = require('android-gcm');
var express = require("express")
var app = express()
var port = process.env.PORT || 5000

var gcmObject = new gcm.AndroidGcm('AIzaSyAmD7bA9DzzNlwqEiFCFxlrC5vtB4yuz3k');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Notification setups
var pusher = new Pusher({
  appId: '162454',
  key: '559173cd02fac2d899db',
  secret: '2fb3a65bd8aeae44d394',
  encrypted: true
});
pusher.port = 443;

// var notificationHubService = azure.createNotificationHubService('CodeCampNotification','Endpoint=sb://codecampfl.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=N1jKdt95BAAnHTslUsaeAXyne9gtg4BMdh6gVzMK++8=');


app.get('/www', function(req, res) {
  res.redirect('/');
});

// Form posts
app.post("/api/PushTest",function(req,res) {
   pusher.trigger('test_channel', 'my_event', {
  "message": req.body.message,
  "title": req.body.title
  }); 
   
   var message = new gcm.Message({
    data: {
        message: req.body.message,
        title: req.body.title
    }
    }); 
gcmObject.send(message, function(GcmError, GcmResponse) {});
  
  res.send("Success. We sent everyone the notification.");
  res.end(); // end the response
});

function GcmError() {
    console.log("error");
}
function GcmResponse(res) {
    console.log("good gcm");
}



// -- Regular web server stuff
app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)






