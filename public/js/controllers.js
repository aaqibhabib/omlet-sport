angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope,GameService) {
  console.log("home");
      $scope.games = GameService.getGames();
    })

.controller('CurrentGameCtrl', function($scope) {
  console.log("game");
})


