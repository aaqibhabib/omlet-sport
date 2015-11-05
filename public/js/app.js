// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    //// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    //// for form inputs)
    //if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
    //  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    //  cordova.plugins.Keyboard.disableScroll(true);
    //
    //}
    //if (window.StatusBar) {
    //  // org.apache.cordova.statusbar required
    //  StatusBar.styleLightContent();
    //}
  });
})

.config(function($stateProvider, $urlRouterProvider) {

      $stateProvider
        // setup an abstract state for the tabss directive
          .state('tabs', {
            abstract: true,
            templateUrl: "templates/tabs.html"
          })

          .state('tabs.home', {
            url: '/home',
            views: {
              'tabs-home': {
                templateUrl: 'templates/home.html',
                controller: "HomeCtrl"
              }
            }
          })

          .state('game', {
            url: "/game",
            templateUrl: "templates/current-score.html",
            controller: "CurrentGameCtrl"

          });

      $urlRouterProvider.otherwise("/home");
});
