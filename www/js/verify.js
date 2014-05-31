angular.module('app.verify', [
  'services'
  ])

.controller('VerifyCtrl', ['$scope', '$rootScope', '$state', 'HttpFactory', 
  function($scope, $rootScope, $state, HttpFactory) {
  console.log('verify');
  $scope.$emit('verify');
  $scope.verStatus = 'Check Verification Status';
  $scope.resentStatus = 'Resend Verification Email'
  // temporary for testing - will put actual local memory calls here in future.
  var username = $rootScope.username;
  var domain = $rootScope.domain;
  
  $scope.checkVerification = function() {
    $scope.verStatus = 'Checking...';
    HttpFactory.verify(username, domain)
      .success(function(verifyData) {
        if (verifyData.status === true) {
          console.log('verified true');
          $state.go('home.opinion');
        } else if (verifyData.status === false) {
          $scope.error = true;
          $scope.verStatus = 'Check Verification Status';
        }
      })
      .error(function() {
        $scope.error = true;
        $scope.verStatus = 'Check Verification Status';
      });
    // setTimeout(function() {
    //   $state.go('home.opinion');
    // }, 1000);
  };

  $scope.resendVerification = function() {
    $scope.resentStatus = 'Resent...';
    HttpFactory.resendEmail(username, domain)
      .success(function() {
        $scope.resentStatus = 'Resend Verification Email';
      })
      .error(function() {
        $scope.error = true;
        $scope.resentStatus = 'Resend Verification Email';
      })
  };

}]);
