angular.module('starter.services', [])

.factory('GameService', function() {
  var expose = {};

  expose.getGames = function() {
    var games = [
      {
        home:"Cavaliers",
        away:"76ers"
      },
      {
        home:"Cavaliers",
        away:"76ers"
      },
      {
        home:"Cavaliers",
        away:"76ers"
      },
      {
        home:"Cavaliers",
        away:"76ers"
      },
      {
        home:"Cavaliers",
        away:"76ers"
      }
    ]
    return games;
  }

      return expose;
});
