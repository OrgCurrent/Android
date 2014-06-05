angular.module('app.verify', [
  'API'
  ])

.controller('VerifyCtrl', ['$scope', '$rootScope', '$state', 'HttpFactory', 
  function($scope, $rootScope, $state, HttpFactory) {

  var local = window.localStorage;
  var verificationPings = 12;

  $scope.$emit('verify');
  $scope.verStatus = 'Check Verification Status';
  $scope.resentStatus = 'Resend Verification Email';
  $scope.username = local.getItem('username');
  $scope.domain = local.getItem('domain');

  var checkVerificationLoop = function(totalPings) {
    setTimeout(function() {
      HttpFactory.verify($scope.username, $scope.domain)
        .success(function(verifyData) {
          if (verifyData.status === true) {
            $state.go('home.opinion');
          } else if (totalPings++ < verificationPings) {
            checkVerificationLoop(totalPings);
          }
        })
    }, 5000)
  }
  
  $scope.checkVerification = function() {
    $scope.verStatus = 'Checking...';
    HttpFactory.verify($scope.username, $scope.domain)
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
  };

  $scope.resendVerification = function() {
    $scope.resentStatus = 'Resending...';
    $scope.resending = true;
    HttpFactory.resendEmail($scope.username, $scope.domain)
      .success(function() {
        $scope.resentStatus = 'Resend Verification Email';
        $scope.resending = false;
        checkVerificationLoop(0);
      })
      .error(function() {
        $scope.error = true;
        $scope.resending = false;
        $scope.resentStatus = 'Resend Verification Email';
      })
  };

  $scope.resubmitEmail = function() {
    $state.go('home.email');
  }

  // when you first arrive at verification page, kick off check verification loop
  checkVerificationLoop(0);

}]);
