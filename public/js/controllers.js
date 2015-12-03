angular.module('starter.controllers', [])
    .controller('OmletCtrl', function($scope, GameService, $state, $window) {

    })
    .controller('HomeCtrl', function($scope, GameService, $state) {
        alert("Home");

        Omlet.ready(function(){
            if(Omlet.isInstalled()){
                var groupId = Omlet.scope.feed_key;

                $scope.checkOpenGame(groupId);

            } else {
                var groupId = "123";
                $scope.checkOpenGame("123");
            }

            GameService.groupId = groupId;
            alert("store" + groupId);
        });

        $scope.checkOpenGame = function(groupId) {
            //check if there is a game open
            GameService.getOpenedGame(groupId).then(function(data) {
                    //if there is a open game, go to the currentGame page
                    alert(data);
                    $state.go('game', {game: data})
                },
                function(reason) {
                    alert(reason);
                    GameService.getNflGames().then(function(data) {
                        $scope.nfl = data;
                    });
                })
        }
    })

    .controller('CurrentGameCtrl', function($scope, GameService, $stateParams, $interval) {
        var groupId = GameService.groupId;
        alert("current" + groupId);
        alert("game id:" + $stateParams.gameId);

        GameService.getGameById($stateParams.gameId, groupId).then(function(data) {
            if (data) {
                $scope.currentGame = data;
                if($scope.currentGame.status == "closed" || $scope.currentGame.status == "scheduled") {

                }
            }
        }, function(reason) {
            alert("can not get the score because" + reason);
            $scope.currentGame = null;
        });
    })

