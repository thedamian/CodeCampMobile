var SessionsObj = [];
var SpeakersObj = [];
var TimeSlotsObj = [
                    {TimeSlotID:'',TimeShow:"Any Time"},
                    {TimeSlotID:'1',TimeShow:"7:30 - Registration"},
                    {TimeSlotID:'2',TimeShow:"8:00 - Keynote"},
                    {TimeSlotID:'3',TimeShow:"8:30am-9:40am"},
                    {TimeSlotID:'4',TimeShow:"9:50am-11:05am"},
                    {TimeSlotID:'5',TimeShow:"11:10am-12:15pm"},
                    {TimeSlotID:'6',TimeShow:"12:20pm-1:15pm"},
                    {TimeSlotID:'7',TimeShow:"1:20pm-2:35pm"},
                    {TimeSlotID:'8',TimeShow:"2:40pm-3:50pm"},
                    {TimeSlotID:'9',TimeShow:"4:00pm-5:15pm"},
                    {TimeSlotID:'10',TimeShow:"5:20pm-6:00pm"}];
                    


angular.module('starter.controllers', [])

.controller('ScheduleCtrl', function($rootScope,$scope,$http,Sessions,$ionicPopup) {
  $scope.sessions = [];
  $scope.speakers = [];
  $scope.sessionTracks = [];
  
 $scope.bookmark = function(thisSessionID) {
     $ionicPopup.alert({
       title: 'This Functionality isn\'t ready',
       template: 'You will be able to bookmark in the future'
     });
   };
  
   Sessions.getSessions().success(function(data) {
      var sessionObj = [];
      var SessionTracks = [''];
      var Speakers = [];
         $(data).find("CCConsolidated").each(function () {
  
         
          $SessionID = $(this).find("SessionID").text().trim(); 
          $SessionStart = $(this).find("SessionStart").text().trim();
          $SessionName = $(this).find("SessionName").text().trim();
          $SessionDescription = $(this).find("SessionDescription").text().trim();
          $SpeakerName = $(this).find("SpeakerName").text().trim();
          $SpeakerID = $(this).find("SpeakerID").text().trim();
          $TimeSlotID = $(this).find("TimeSlotID").text().trim();
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
              SessionTracks: $SessionTrack,
              TimeSlotID: $TimeSlotID,
              TimeSlotText: TimeSlotsObj[TimeSlotsObj.map(function(e) { return e.TimeSlotID}).indexOf($TimeSlotID)].TimeShow
            });
           
            
         }); // find each CCConsolidated
           SessionsObj = sessionObj;
           $scope.sessions = sessionObj;
           SpeakersObj = Speakers;
           $scope.speakers = Speakers;
           $rootScope.speakers = Speakers;
           $scope.sessionTracks = SessionTracks;
           $scope.SessionTrackSelected = SessionTracks[0];
           $scope.TimeSlots = TimeSlotsObj;
           $scope.TimeSelected = TimeSlotsObj[0];
          //console.dir(sessionObj);
          //console.dir(TimeSlotsObj[0]);
      });
})

.controller('SpeakersCtrl', function($rootScope,$scope, Speakers,$ionicPopup) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  //$scope.speakers = Speakers.all();
 // $scope.speakers =$rootScope.speakers;
  $scope.speakers = SpeakersObj;
  
   $scope.bookmark = function(thisSessionID) {
     $ionicPopup.alert({
       title: 'This Functionality isn\'t ready',
       template: 'You will be able to bookmark in the future'
     });
   };
   
})

.controller('SpeakersDetailCtrl', function($scope, $stateParams, Speakers) {
  //console.dir(SpeakersObj);
  //console.log($stateParams.speakerId);
  $scope.speaker = SpeakersObj[SpeakersObj.map(function(e) { return e.id}).indexOf($stateParams.speakerId)];
  
})

.controller('ScheduleDetailCtrl', function($scope, $stateParams, Sessions) {
// console.dir(SessionsObj);
  $scope.session = Sessions.get(SessionsObj,$stateParams.sessionId);
  
})
.controller('MapCtrl', function($scope) {
 $scope.floor=1;
 
 $scope.clickFloor = function(thisfloor) {
    $scope.floor=thisfloor;
    //console.log(thisfloor);
    //$("#floorsplanmap").attr('src',"maps/Floor" + thisfloor + ".png");
 };

})
.controller('socialCtrl', function($scope) {

});

