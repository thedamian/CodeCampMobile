angular.module('starter.controllers', [])

.controller('ScheduleCtrl', function($scope) {})

.controller('SpeakersCtrl', function($scope, Speakers) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.speakers = Speakers.all();
  $scope.remove = function(speaker) {
    Speakers.remove(speaker);
  };
})

.controller('SpeakersDetailCtrl', function($scope, $stateParams, Speakers) {
  $scope.speakers = Speakers.get($stateParams.speakerId);
})

.controller('MapCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
