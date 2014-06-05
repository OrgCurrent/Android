angular.module('app.email', [
  'API'
  ])

.controller('EmailCtrl', ['$scope', '$rootScope', '$http', 'HttpFactory', '$state',
  function($scope, $rootScope, $http, HttpFactory, $state){
  $scope.$emit('email');
  $scope.submitted = false;
  $scope.email = {};
  $scope.verifyButton = 'Send Verification Email';

  var serverError = function(data) {
    console.log('error!', data);
    $scope.serverError = true;
  }

  var setStorage = function(username, domain) {
    window.localStorage.setItem('username', username);
    window.localStorage.setItem('domain', domain);
  }

  $scope.sendEmail = function() {
    $scope.serverError = false;
    $scope.notUnique = false;

    if($scope.email_form.$valid && $scope.email.userInput) {
      $scope.verifyButton = 'Sending...'
      var username = $scope.email.userInput.split('@')[0]
      var domain = $scope.email.userInput.split('@')[1]

      HttpFactory.sendEmail(username, domain)
      .success(function(data) { 
        // set local storage and emit so that home changes
        // its scope username domain vars
        setStorage(username, domain);
        $scope.$emit('resetStorage');

        // if user already in system, data.status === 'existing'
        if (data.status === 'existing') {
          // resending email will set verify status to false
          HttpFactory.resendEmail(username, domain)
          .success(function() {
            $state.go('home.verify');
          })
        } else {
        // otherwise, status === 'new'
        // false, they will need to reverify, send both cases straight to home.verify
        $state.go('home.verify');
        }
      })
      .error(function(data) {
        serverError(data);
        $scope.verifyButton = 'Send Verification Email';
      });
    } else {
      $scope.email_form.submitted = true;
    }
  }
}])
