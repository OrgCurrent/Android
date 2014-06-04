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
    $scope.verifyButton = 'Sending...'

    if($scope.email_form.$valid) {
      
      var username = $scope.email.userInput.split('@')[0]
      var domain = $scope.email.userInput.split('@')[1]

      HttpFactory.sendEmail(username, domain)
        .success(function(data) { 
          // set local storage and emit so that home changes
          // its scope username domain vars
          setStorage(username, domain);
          $scope.$emit('resetStorage');

          // if user already in system, data.status === 'existing'
          // otherwise, status === 'new'
          if (data.status === 'new') {
            $state.go('home.verify');
          } else if (data.status === 'existing') {
            // if existing, check if verified yet
            HttpFactory.verify(username, domain)
              .success(function(verifyData) {
                if (verifyData.status === false) {
                  $state.go('home.verify');
                } else if (verifyData.status === true) {
                  // if user has already been verified before... resend verification
                  // update email to be non-verified
                  // show error message - verified email already exists - MIGHT WANT TO UPDATE LOGIC IN FUTURE
                  // for now, during testing, just send to verify.js page
                  $state.go('home.verify');
                }
              })
              .error(function(data) {
                serverError(data);
                $scope.verifyButton = 'Send Verification Email';
              });
          }
      })
      .error(function(data) {
          // server error
          serverError(data);
      });
    } else {
      $scope.email_form.submitted = true;
    }
  }
}])
