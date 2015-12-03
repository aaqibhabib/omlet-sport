angular.module('starter.controllers', [])
    .controller('OmletCtrl', function($scope, GameService, $state) {
        Omlet.ready(function(){
            if(Omlet.isInstalled()){
                var groupId = Omlet.scope.feed_key;

                $scope.checkOpenGame(groupId);

            } else {
                var groupId = "123";
                $scope.checkOpenGame("123");
            }

            GameService.groupId = groupId;
        });

        $scope.checkOpenGame = function(groupId) {
            //check if there is a game open
            GameService.getOpenedGame(groupId).then(function(data) {
                    //if there is a open game, go to the currentGame page
                    $state.go('game', {game: data, gameId: data.id});
                },
                function(reason) {
                    $state.go('tabs.home');
                })
        }
    })
    .controller('HomeCtrl', function($scope, GameService, $state) {
        GameService.getNflGames().then(function(data) {
            $scope.nfl = data;
        });
    })

    .controller('CurrentGameCtrl', function($scope, GameService, $stateParams, $interval) {
        var groupId = GameService.groupId;

        GameService.getGameById($stateParams.gameId, groupId).then(function(data) {
            if (data) {
                $scope.currentGame = data;
                if($scope.currentGame.status == "closed" || $scope.currentGame.status == "scheduled") {

                }
            }
        }, function(reason) {

            $scope.currentGame = null;
        });
    })

