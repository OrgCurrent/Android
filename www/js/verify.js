angular.module('app.verify', [])

.controller('VerifyCtrl', function($scope, $state) {
  console.log('verify');
  $scope.$emit('verify');
  $scope.verStatus = 'Check Verification Status';
  $scope.resentStatus = 'Resend Verification Email'
  
  $scope.checkVerification = function() {
    $scope.verStatus = 'Checking...';
    setTimeout(function() {
      $state.go('home.opinion');
    }, 1000);
  };

  $scope.resendVerification = function() {
    $scope.resentStatus = 'Resent...';
  };

})
