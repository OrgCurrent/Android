angular.module('app.home', [
  'services',
  ])
.controller('HomeCtrl', ['$scope', '$rootScope', '$state', 'HttpFactory', 
  function($scope, $rootScope, $state, HttpFactory) {

  var local = window.localStorage;

  if (local.getItem('username')) {
    HttpFactory.verify(local.getItem('username'), local.getItem('domain'))
      .success(function(verifyData) {
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
  } else {
    // no user on this app yet
    $state.go('home.email');
  }

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

}]);
