angular.module('app.verify', [
  'services'
  ])

.controller('VerifyCtrl', function($scope, $state, HttpFactory) {
  console.log('verify');
  $scope.$emit('verify');
  $scope.verStatus = 'Check Verification Status';
  $scope.resentStatus = 'Resend Verification Email'
  
  $scope.checkVerification = function() {
    $scope.verStatus = 'Checking...';
    var username = 'test'
    var domain = 'test.com'
    HttpFactory.verify(username, domain)
      .success(function(result) {
        if (result.state === true) {
          $state.go('home.opinion');
        } else {
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
  };

})
