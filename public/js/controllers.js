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

            GameService.groupId = groupId;
            alert("store" + groupId);
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

    .controller('CurrentGameCtrl', function($scope, GameService, $stateParams, $interval) {
        var groupId = GameService.groupId;
        alert("current" + groupId);
        alert("game id:" + $stateParams.gameId);

        //use interval to get live
        var stop;
        $scope.update = function() {
            // Don't start a new update
            if ( angular.isDefined(stop) ) return;
            alert("enter stop");
            stop = $interval(function() {

                alert("enter interval");
                GameService.getGameById($stateParams.gameId, groupId).then(function(data) {
                    if (data) {
                        $scope.currentGame = data;
                        if($scope.currentGame.status == "closed") {
                            $scope.stopUpdate();
                        }
                    }
                }, function(reason) {
                    alert("can not get the score because" + reason);
                    $scope.currentGame = null;
                });

            }, 60000);
        };

        $scope.stopUpdate = function() {
            if (angular.isDefined(stop)) {
                $interval.cancel(stop);
                stop = undefined;
            }
        };

        $scope.$on('$destroy', function() {
            // Make sure that the interval is destroyed too
            $scope.stopUpdate();
        });
    })

