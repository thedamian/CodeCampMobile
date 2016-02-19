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
//app.use(express.urlencoded());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


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

app.get('/app',function(req,res) {
  checkForMobilePlatform(req,res);
  res.redirect('/');
});

app.get('/',function(req,res) {
  checkForMobilePlatform(req,res);
});

function checkForMobilePlatform(req,res) {
  var ua = req.headers['user-agent'];


    //Windows PHone
    if (/Windows Phone/.test(ua))
        res.redirect('https://www.microsoft.com/en-us/store/apps/south-florida-code-camp/9nblggh5f7c5');

    if (/IEMobile/.test(ua))
        res.redirect('https://www.microsoft.com/en-us/store/apps/south-florida-code-camp/9nblggh5f7c5');

    // Blackberry
    if ( (/BlackBerry/.test(ua)) || (/SymbOS/.test(ua)) || (/SymbianOS/.test(ua)) || (/Nokia/.test(ua)) ||(/webOS/.test(ua)) || (/Opera/.test(ua)) )
    {
       if (!(/BB10/.test(ua)))
        res.redirect('/bb');
    }


    //Android
    if (/Android/.test(ua))
        //res.redirect('https://play.google.com/store/apps/details?id=com.threeguys1phone.codecampfl');
        res.redirect('market://details?id=com.threeguys1phone.codecampfl');

    // iOS
    if (/iPhone/.test(ua))
        res.redirect('https://itunes.apple.com/us/app/south-florida-code-camp/id1070282332?ls=1&mt=8');
    
    if (/iPad/.test(ua))
        res.redirect('https://itunes.apple.com/us/app/south-florida-code-camp/id1070282332?ls=1&mt=8');    
    

}

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

var server = http.createServer(app);
server.listen(port);

console.log("http server listening on %d", port);
