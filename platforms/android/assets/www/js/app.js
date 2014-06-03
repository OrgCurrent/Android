// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', [
  'ionic',
  'ui.router',
  'app.home',
  'app.email',
  'app.verify',
  'app.opinion',
  'services'
  ])

.run(['$ionicPlatform', 
  function($ionicPlatform) {
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
}])

.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 
  function($stateProvider, $urlRouterProvider, $httpProvider) {
  delete $httpProvider.defaults.headers.common['X-Requested-With'];

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'templates/home.html',
      controller: 'HomeCtrl'
    })
    .state('home.loading', {
      url: 'loading',
      templateUrl: 'templates/loading.html',
      controller: 'EmailCtrl'
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

  $urlRouterProvider.otherwise('/loading');
}]);