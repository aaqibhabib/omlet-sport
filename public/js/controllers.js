angular.module('starter.controllers', [])

    .controller('HomeCtrl', function($scope, GameService) {

        GameService.getNbaGames().then(function(data) {
            $scope.nba = data;
        });

        GameService.getNflGames().then(function(data) {
            $scope.nfl = data;
        });

    })

    .controller('CurrentGameCtrl', function($scope, GameService, $stateParams) {

        GameService.getGameById($stateParams.id).then(function(data) {
            if (data)
            $scope.currentGame = data;

        }, function(reason) {
            console.log("can not get the score because" + reason);
            $scope.currentGame = null;
        })
    })


