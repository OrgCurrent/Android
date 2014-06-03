angular.module('app.email', [
  'services'
  ])

.controller('EmailCtrl', ['$scope', '$rootScope', '$http', 'HttpFactory', '$state',
  function($scope, $rootScope, $http, HttpFactory, $state){
  $scope.$emit('email');
  $scope.submitted = false;
  $scope.email = {};

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

    if($scope.email_form.$valid) {
      
      var username = $scope.email.userInput.split('@')[0]
      var domain = $scope.email.userInput.split('@')[1]

      HttpFactory.sendEmail(username, domain)
       .success(function(data, status, headers, config) { 
          // if user already in system, data.status === 'existing'
          // otherwise, status === 'new'
          if (data.status === 'new') {
            setStorage(username, domain);
            $state.go('home.verify');
          } else if (data.status === 'existing') {
            // if existing, check if verified yet
            HttpFactory.verify(username, domain)
              .success(function(verifyData) {
                if (verifyData.status === false) {
                  setStorage(username, domain);
                  $state.go('home.verify');
                } else if (verifyData.status === true) {
                  // if user has already been verified before... resend verification
                  // update email to be non-verified
                  // show error message - verified email already exists - MIGHT WANT TO UPDATE LOGIC IN FUTURE
                  // for now, during testing, just send to verify.js page
                  setStorage(username, domain);
                  $state.go('home.verify');
                }
              })
              .error(function(data) {
                serverError(data);
              });
          }
      })
      .error(function(data, status, headers, config) {
          // server error
          serverError(data);
      });
    } else {
      $scope.email_form.submitted = true;
    }
  }
}]);
