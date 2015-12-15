var SessionsObj = [];
var SpeakersObj = [];

angular.module('starter.controllers', [])

.controller('ScheduleCtrl', function($rootScope,$scope,$http,Sessions) {
  $scope.sessions = [];
  $scope.speakers = [];
  $scope.sessionTracks = [];
  
   Sessions.getSessions().success(function(data) {
      var sessionObj = [];
      var SessionTracks = [];
      var Speakers = [];
         $(data).find("CCConsolidated").each(function () {
  
         
          $SessionID = $(this).find("SessionID").text().trim(); 
          $SessionStart = $(this).find("SessionStart").text().trim();
          $SessionName = $(this).find("SessionName").text().trim();
          $SessionDescription = $(this).find("SessionDescription").text().trim();
          $SpeakerName = $(this).find("SpeakerName").text().trim();
          $SpeakerID = $(this).find("SpeakerID").text().trim();
          $SpeakerWebSite = $(this).find("SpeakerWebSite").text().trim();
          $SpeakerImage = $(this).find("SpeakerImage").text().trim();
          $RoomName = $(this).find("RoomName").text().trim();
          $RoomNumber = $(this).find("RoomNumber").text().trim();
          $SessionTrack = $RoomName.substr(0,($RoomName.indexOf("Room")-1)).trim();
          
          if ($SessionTrack.indexOf("/") ==  ($SessionTrack.length-1))
          { // clean up
            $SessionTrack = $SessionTrack.substr(0,$SessionTrack.length-2);
          }
          
          if (SessionTracks.indexOf($SessionTrack)<0)
          {
            SessionTracks.push($SessionTrack);
          }
          //console.log($SpeakerID);
          
          if ($SpeakerName=='') { $SpeakerName = "none";}
          if ($SpeakerImage == '')
            {
              $SpeakerImage ="images/NoProfilePic.jpg";
            }
          
          if (Speakers.map(function(e) { return e.id}).indexOf($SpeakerID) == -1)
          {
            Speakers.push({
              id:$SpeakerID,
              name: $SpeakerName,
              website: $SpeakerWebSite,
              face:$SpeakerImage 
            });
          }
          
          
        sessionObj.push({
              SessionID:$SessionID,
              SessionStart:$SessionStart,
              SessionName:$SessionName,
              SpeakerID: $SpeakerID,
              SessionDescription:$SessionDescription,
              SpeakerName:$SpeakerName,
              SpeakerWebSite:$SpeakerWebSite,
              SpeakerImage:$SpeakerImage,
              RoomName:$RoomName,
              RoomNumber:$RoomNumber,
              SessionTracks: $SessionTrack
            });
           
            
         }); // find each CCConsolidated
           SessionsObj = sessionObj;
           $scope.sessions = sessionObj;
           $rootScope.speakers = Speakers;
           $scope.sessionTracks = SessionTracks;
           $scope.SessionTrackSelected = SessionTracks[0];
          //console.dir(Speakers);
          //console.dir(SessionTracks);
      });
})

.controller('SpeakersCtrl', function($rootScope,$scope, Speakers) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  //$scope.speakers = Speakers.all();
 // $scope.speakers =$rootScope.speakers;
})

.controller('SpeakersDetailCtrl', function($scope, $stateParams, Speakers) {
  console.dir(SpeakersObj)
  $scope.speaker = Speakers.get(SpeakersObj,$stateParams.speakerId);
})

.controller('ScheduleDetailCtrl', function($scope, $stateParams, Sessions) {
 console.dir(SessionsObj);
  $scope.session = Sessions.get(SessionsObj,$stateParams.sessionId);
  
})
.controller('MapCtrl', function($scope) {

})
.controller('SocialCtrl', function($scope) {

});

