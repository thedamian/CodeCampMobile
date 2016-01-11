// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.schedule', {
    url: '/schedule',
    views: {
      'tab-schedule': {
        templateUrl: 'templates/tab-schedule.html',
        controller: 'ScheduleCtrl'
      }
    }
  })
  .state('tab.schedule-details', {
    url: '/session/:sessionId',
    views: {
      'tab-schedule': {
        templateUrl: 'templates/schedule-detail.html',
        controller: 'ScheduleDetailCtrl'
      }
    }
  })
  .state('tab.speakers', {
      url: '/speakers',
      views: {
        'tab-speakers': {
          templateUrl: 'templates/tab-speakers.html',
          controller: 'SpeakersCtrl'
        }
      }
    })
    .state('tab.speakers-detail', {
      url: '/speaker/:speakerId',
      views: {
        'tab-speakers': {
          templateUrl: 'templates/speaker-detail.html',
          controller: 'SpeakersDetailCtrl'
        }
      }
    })

  .state('tab.map', {
    url: '/map',
    views: {
      'tab-map': {
        templateUrl: 'templates/tab-map.html',
        controller: 'MapCtrl'
      }
    }
  })
    .state('tab.social', {
    url: '/social',
    views: {
      'tab-social': {
        templateUrl: 'templates/tab-social.html',
        controller: 'socialCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/schedule');

})
.config(['$ionicConfigProvider', function($ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom'); // Windows phone and Blackberry have trouble with it at the bottom

}]);

    /*
    // Enable pusher logging - don't include this in production
    Pusher.log = function(message) {
      if (window.console && window.console.log) {
        window.console.log(message);
      }
    };

    var pusher = new Pusher('559173cd02fac2d899db', {
      encrypted: true
    });
    
    
    var channel = pusher.subscribe('test_channel');
    channel.bind('my_event', function(data) {
        alert(data.title + "\n" + data.message);
        //  $ionicPopup.alert({
        //     title: data.title,
        //    template: data.message
        //  });
    });
    */