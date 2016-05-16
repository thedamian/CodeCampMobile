angular.module('starter.services', [])

.factory('Speakers', function() {
  // Might use a resource here that returns a JSON array
  return {
      get : function(SpeakerArr,SpeakerID)
    {
    return SpeakerArr[SpeakerArr.map(function(e) { return e.id}).indexOf(SpeakerID)];
    }
  };
})
.factory('Sessions', ['$http',function($http) {
  
return {
  getSessions : function() {
    return $http({
      url: "http://codecampmobile.azurewebsites.net/api",
      dataType: "xml",
      method: 'GET'
    }) // return $http
  }, //getSession
  get : function(sessionsArr,sessionID)
  {
   return sessionsArr[sessionsArr.map(function(e) { return e.SessionID}).indexOf(sessionID)];
  }
} // return

}]); // factory

      

      

		
	






