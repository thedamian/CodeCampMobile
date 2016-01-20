
// Initiate some variables
var SessionsObj = [];
var SpeakersObj = [];
      var SessionTracks = [''];
      var Speakers = [];
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
// get requestss

    $(document).ready(function () {
      //jquery reqdy
      
        $.ajax({
            type: "GET",
            url: "http://crossorigin.me/http://www.fladotnet.com/flanetdata/api/ccconsolidated",
            cache: false,
            dataType: "xml",
            success: function(xml) {
                $(xml).find('CCConsolidated').each(function(){
                
                
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
                
                // insert into list of schedules
                $("#SessionsDiv").append('<li><a href="#"><img src="'+$SpeakerImage+'"><h2>'+$SessionName+'</h2><p>Time: '+$SessionStart+'<BR>Room: '+$RoomNumber+'</p><p>'+$SessionDescription+'</p><p class="ui-li-aside">iOS</p></a></li>');
                
                
                }); // end of each
            }, // end success
            fail: function() {
              alert("We failed to get the schedule.\n Maybe no internet? Hmmmm....");
            }
            
        }); // end ajax
  
  
  
    }); // end document Ready



  
         

           
