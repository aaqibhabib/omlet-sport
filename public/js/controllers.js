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
                    alert(data);
                    $state.go('gameDetails', {game: data})
                },
                function(reason) {
                    alert(reason);
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

        GameService.getGameById($stateParams.gameId, groupId).then(function(data) {
            if (data) {
                $scope.currentGame = data;
                if($scope.currentGame.status == "closed" || $scope.currentGame.status == "scheduled") {
                    $scope.stop();
                }
            }
        }, function(reason) {
            alert("can not get the score because" + reason);
            $scope.currentGame = null;
        });

        var promise;

        //// starts the interval
        //$scope.start = function() {
        //    // stops any running interval to avoid two intervals running at the same time
        //    $scope.stop();
        //
        //    // store the interval promise
        //    promise = $interval(function() {
        //        alert("enter ")
        //        GameService.getGameById($stateParams.gameId, groupId).then(function(data) {
        //            if (data) {
        //                $scope.currentGame = data;
        //                if($scope.currentGame.status == "closed" || $scope.currentGame.status == "scheduled") {
        //                    $scope.stop();
        //                }
        //            }
        //        }, function(reason) {
        //            alert("can not get the score because" + reason);
        //            $scope.currentGame = null;
        //        });
        //    }, 60000);
        //};
        //
        //// stops the interval
        //$scope.stop = function() {
        //    $interval.cancel(promise);
        //};
        //
        //// starting the interval by default
        //$scope.start();
        //
        //// stops the interval when the scope is destroyed,
        //// this usually happens when a route is changed and
        //// the ItemsController $scope gets destroyed. The
        //// destruction of the ItemsController scope does not
        //// guarantee the stopping of any intervals, you must
        //// be responsible of stopping it when the scope is
        //// is destroyed.
        //$scope.$on('$destroy', function() {
        //    $scope.stop();
        //});


    })

