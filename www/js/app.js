// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', [
  'ionic',
  'ui.router',
  'app.email',
  'app.verify',
  'app.opinion',
  'services'
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


.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
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
})

.controller('HomeCtrl', function($scope, $rootScope, $state, HttpFactory) {
  console.log('we be home');

  HttpFactory.getUser()
    .success(function(data) {
      HttpFactory.verify(data.username, data.domain)
        .success(function(verifyData) {
          // set up username/domain data. In future, this will pull from local storage
          $rootScope.username = data.username;
          $rootScope.domain = data.domain;
          console.log(data);
          // user not verified
          if (verifyData.status === false) {
            $state.go('home.verify');
          }
          // user is verified
          else if (verifyData.status === true) {
            $state.go('home.opinion');
          }
        })
        .error(function() {
          // user not found
          $state.go('home.email');
        });
    })
    .error(function() {
      // no user data in system yet
      $state.go('home.email');
    });

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
    $scope.completed = false;
  });

  $scope.$on("complete", function(event) {
    $scope.$apply(function() {
      $scope.completed = true;
    });

  $scope.refresh = function() {
    $scope.$broadcast('reload');
    // $state.reload();
  }

  })
})
