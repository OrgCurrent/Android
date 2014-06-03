angular.module('app.verify', [
  'services'
  ])

.controller('VerifyCtrl', ['$scope', '$rootScope', '$state', 'HttpFactory', 
  function($scope, $rootScope, $state, HttpFactory) {

  var local = window.localStorage;

  $scope.$emit('verify');
  $scope.verStatus = 'Check Verification Status';
  $scope.resentStatus = 'Resend Verification Email'
  var username = local.getItem('username');
  var domain = local.getItem('domain');
  
  $scope.checkVerification = function() {
    $scope.verStatus = 'Checking...';
    HttpFactory.verify(username, domain)
      .success(function(verifyData) {
        if (verifyData.status === true) {
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
    $scope.resentStatus = 'Resending...';
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
