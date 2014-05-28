angular.module('app.verify', [])

.controller('VerifyCtrl', function($scope) {
  console.log('verify');
  $scope.$emit('verify');
  $scope.verStatus = 'Check Verification Status';
  $scope.resentStatus = 'Resend Verification Email'
  
  $scope.checkVerification = function() {
    $scope.verStatus = 'Checking...';
  };

  $scope.resendVerification = function() {
    $scope.resentStatus = 'Resent...';
  };

})
