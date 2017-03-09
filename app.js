var http = require("http")
//var Pusher = require('pusher');
var bodyParser = require('body-parser');
//var azure = require('azure');
var gcm = require('android-gcm');
var express = require("express");
var request = require('request');
var nodemailer = require('nodemailer');
var app = express();
var port = process.env.PORT || 5000

var gcmObject = new gcm.AndroidGcm('AIzaSyBKEk231bdju1rWfilzrp_h-8qO35B9SaY');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//app.use(express.urlencoded());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// // Notification setups
// var pusher = new Pusher({
//   appId: '162454',
//   key: '559173cd02fac2d899db',
//   secret: '2fb3a65bd8aeae44d394',
//   encrypted: true
// });
// pusher.port = 443;

// var notificationHubService = azure.createNotificationHubService('CodeCampNotification','Endpoint=sb://codecampfl.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=N1jKdt95BAAnHTslUsaeAXyne9gtg4BMdh6gVzMK++8=');



app.get('/www', function(req, res) {
  res.redirect('/');
});

app.get('/app',function(req,res) {
  checkForMobilePlatform(req,res);
  res.redirect('/');
});

/*
app.get('/',function(req,res) {
  checkForMobilePlatform(req,res);
});
*/


app.get('/api',function(req,res) {
    //request.pipe(request.get('http://www.fladotnet.com/flanetdata/api/ccconsolidated'));
    request
  .get('http://www.fladotnet.com/flanetdata/api/ccconsolidated')
  .on('response', function(response) {
    // console.log(response.statusCode) // 200 
    // console.log(response.headers['content-type']) // 'image/png' 
  })
  .pipe(res)
});


function checkForMobilePlatform(req,res) {
  var ua = req.headers['user-agent'];

/*
    //Windows PHone
    if (/Windows Phone/.test(ua))
        res.redirect('https://www.microsoft.com/en-us/store/apps/south-florida-code-camp/9nblggh5f7c5');

    if (/IEMobile/.test(ua))
        res.redirect('https://www.microsoft.com/en-us/store/apps/south-florida-code-camp/9nblggh5f7c5');
*/
    // Blackberry
    if ( (/BlackBerry/.test(ua)) || (/SymbOS/.test(ua)) || (/SymbianOS/.test(ua)) || (/Nokia/.test(ua)) ||(/webOS/.test(ua)) || (/Opera/.test(ua)) )
    {
       if (!(/BB10/.test(ua)))
        res.redirect('/bb');
    }

/*
    //Android
    if (/Android/.test(ua))
        //res.redirect('https://play.google.com/store/apps/details?id=com.threeguys1phone.codecampfl');
        res.redirect('market://details?id=com.threeguys1phone.codecampfl');

    // iOS
    if (/iPhone/.test(ua))
        res.redirect('https://itunes.apple.com/us/app/south-florida-code-camp/id1070282332?ls=1&mt=8');
    
    if (/iPad/.test(ua))
        res.redirect('https://itunes.apple.com/us/app/south-florida-code-camp/id1070282332?ls=1&mt=8');    
   */ 

}

// Form posts
app.post("/api/PushTest",function(req,res) {
  //  pusher.trigger('test_channel', 'my_event', {
  // "message": req.body.message,
  // "title": req.body.title
  // }); 
    
    var message = new gcm.Message({
    registration_ids: ['fkMlq1U1gpY:APA91bH-IkVdhAfA38UXT1FldRuOF2cVVFS7f50634FMimkZ8JJyaju5AzIt2FTe7y30qLRZCzOq0zTp2Zm7WU9gWlg_PS1Ir28whEYAjc8Vui8lDeKr6VpuNNa0F-Xtw3rL7tEO8H4I','ci3eKVas3mU:APA91bEzOnnKvW3SCCUgt9tIKAju7JDihuVVpOOtzqKJ5H7JLfMu_ht3F638wXb5ZVEsL3mznOdoTTaH9_YbPt7hYOYZtXQqzmMozenOSpq3s_sUMQSfyXxPeettm18joKJV1IY2Regt'],
    
    data: {
        message: req.body.message,
        title: req.body.title
       }
    });
    
    gcmObject.send(message, function(err, response) {
    
    
     if (!err) {
        res.send("Success"+JSON.stringify(response));
      } else {
        res.send(err);
      }
      res.end();
      
    });
  
   // end the response
});

app.get('/api/NewPush',function(req,res) { // /api/NewPush?id=123
    var id = req.query.id;
    
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport('smtps://damianmontero%40gmail.com:Lily4321@smtp.gmail.com');

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: '"Damian Montero" <damianmontero@gmail.com>', // sender address
        to: 'damianmontero@gmail.com', // list of receivers
        subject: 'Notification added', // Subject line
        text: 'New notification registration of: '+ id, // plaintext body
        html: '<b>New notification registration of: '+ id+' </b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            res.send("Error: " + error);
            res.end();
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
        res.send("Ok");
        res.end();
    });
    
    

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
