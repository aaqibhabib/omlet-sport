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
                    GameService.currentGame = data;
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

        //Initiate the Timer object.
        $scope.Timer = null;
        $scope.comments = [];


        //Timer start function.
        $scope.StartTimer = function () {
            //Set the Timer start message.
            $scope.Message = "Timer started. ";

            //Initialize the Timer to run every 1000 milliseconds i.e. one second.
            $scope.Timer = $interval(function () {
                GameService.getGameById($stateParams.gameId, groupId).then(function(data) {
                    if (data) {
                        $scope.currentGame = data;
                        GameService.currentGame = data;


                        if($scope.currentGame.status == "closed" || $scope.currentGame.status == "scheduled") {
                            $scope.StopTimer();
                        }
                    }
                }, function(reason) {
                    $scope.currentGame = null;
                });
            }, 1000);
        };

        //Timer stop function.
        $scope.StopTimer = function () {

            //Set the Timer stop message.
            $scope.Message = "Timer stopped.";

            //Cancel the Timer.
            if (angular.isDefined($scope.Timer)) {
                $interval.cancel($scope.Timer);
            }
        };
        $scope.StartTimer();

        $scope.submitForm = function(formData) {
            var title = $scope.currentGame.home.alias + " " + $scope.currentGame.home.points
                + " VS " + $scope.currentGame.away.alias + " " + $scope.currentGame.away.points;
            var comment = "";

            if (formData) {
                comment = formData;
                $scope.comments.push(comment);
            }

            Omlet.ready(function() {
                if(!isFromRDL()) {

                    var rdl = Omlet.createRDL({
                        noun: "pin-app",
                        displayTitle: title,
                        displayText: comment,
                        json: {game: $scope.currentGame, gameId: GameService.currentGame.id},
                        webCallback:"omlet-pinapp:http://ec2-52-34-18-73.us-west-2.compute.amazonaws.com:8080/gameDetails",
                        callback:"omlet-pinapp:http://ec2-52-34-18-73.us-west-2.compute.amazonaws.com:8080/gameDetails"
                    });
                    Omlet.exit(rdl);

                }
            })
        };



        function getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }

        function isFromRDL() {
            var qs = getParameterByName("from_rdl");
            return qs === "true";
        }


    })

