var http = require("http")
var Pusher = require('pusher');
var azure = require('azure');
var azure = require('azure');
var express = require("express")
var app = express()
var port = process.env.PORT || 5000

// Notification setups
var pusher = new Pusher({
  appId: '162454',
  key: '559173cd02fac2d899db',
  secret: '2fb3a65bd8aeae44d394',
  encrypted: true
});
pusher.port = 443;

var notificationHubService = azure.createNotificationHubService('CodeCampNotification','Endpoint=sb://codecampfl.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=N1jKdt95BAAnHTslUsaeAXyne9gtg4BMdh6gVzMK++8=');




// Form posts
app.post("/www/api/PushTest",function(req,res) {
   pusher.trigger('test_channel', 'my_event', {
  "message": req.body.message,
  "title": req.body.title
  }); 
    
    var payload = {
            data: {
                msg: 'notification from the code camp. Your next is ready: ' + req.body.message
            }
        };
    // Send Notification to android 
    notificationHubService.gcm.send(null, payload, function(error){
    if(!error){
        //notification sent
    }
    });
  
  res.send("Success. We sent everyone the notification.");
});




// -- Regular web server stuff
app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)






