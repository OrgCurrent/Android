// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', [
  'ionic',
  'ui.router',
  'app.email',
  'app.verify',
  'app.opinion'
  ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'templates/home.html',
      controller: 'HomeCtrl'
    })
    .state('home.email', {
      url: 'email',
      templateUrl: 'templates/email.html',
      controller: 'EmailCtrl'
    })
    .state('home.verify', {
      url: 'verify',
      templateUrl: 'templates/verify.html',
      controller: 'VerifyCtrl'
    })
    .state('home.opinion', {
      url: 'opinion',
      templateUrl: 'templates/opinion.html',
      controller: 'OpinionCtrl'
    })

  $urlRouterProvider.otherwise('/email');
})

.controller('HomeCtrl', function($scope) {
  console.log('we be home');

  $scope.$on("email", function(event, user) {
    $scope.verified = false;
    $scope.email = 'button-balanced';
    $scope.verify = '';
    $scope.opinion = '';
  });

  $scope.$on("verify", function(event, user) {
    $scope.verified = false;
    $scope.email = '';
    $scope.verify = 'button-balanced';
    $scope.opinion = '';
  });
  
  $scope.$on("opinion", function(event, user) {
    $scope.verified = true;
    // $scope.email = '';
    // $scope.verify = '';
    // $scope.opinion = 'button-balanced';
  });
})