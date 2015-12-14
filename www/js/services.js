angular.module('starter.services', [])

.factory('Speakers', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var speakers = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return speakers;
    },
    remove: function(speaker) {
      speakers.splice(speakers.indexOf(speaker), 1);
    },
    get: function(speakerId) {
      for (var i = 0; i < speakers.length; i++) {
        if (speakers[i].id === parseInt(speakerId)) {
          return speakers[i];
        }
      }
      return null;
    }
  };
});
