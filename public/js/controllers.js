angular.module('starter.controllers', [])
    .controller('OmletCtrl', function($scope, GameService, $state, $window) {

        Omlet.ready(function(){
            if(Omlet.isInstalled()){
                var groupId = Omlet.scope.feed_key;

                $scope.checkOpenGame(groupId);

            } else {
                var groupId = "123";
                $scope.checkOpenGame("123");
            }
            alert(groupId);
            GameService.groupId = groupId;
        });

        $scope.checkOpenGame = function(groupId) {
            //check if there is a game open
            GameService.getOpenedGame(groupId).then(function(data) {
                    //if there is a open game, go to the currentGame page
                    $state.go('gameDetails', {game: data})
                },
                function(reason) {
                    $state.go('tabs.home');
                })
        }

    })
    .controller('HomeCtrl', function($scope, GameService, $state) {
        alert("Home");
        GameService.getNbaGames().then(function(data) {
            $scope.nba = data;
        });

        GameService.getNflGames().then(function(data) {
            $scope.nfl = data;
        });
    })

    .controller('CurrentGameCtrl', function($scope, GameService, $stateParams, $window) {
        var groupId = GameService.groupId;
        alert("current" + groupId);
        GameService.getGameById($stateParams.id, groupId).then(function(data) {
            if (data) {
                $scope.currentGame = data;
                console.log("get data");
            }

        }, function(reason) {
            console.log("can not get the score because" + reason);
            $scope.currentGame = null;
        });
    })

