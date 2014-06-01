angular.module('app.email', [
  'services'
  ])

.controller('EmailCtrl', ['$scope', '$rootScope', '$http', 'HttpFactory', '$state',
  function($scope, $rootScope, $http, HttpFactory, $state){
  $scope.$emit('email');
  $scope.submitted = false;
  $scope.email = {};

  var local = window.localStorage;

  var serverError = function(data) {
    console.log('error!', data);
    $scope.serverError = true;
  }

  $scope.sendEmail = function() {
    $scope.serverError = false;
    $scope.notUnique = false;

    if($scope.email_form.$valid) {
      
      var username = $scope.email.userInput.split('@')[0]
      var domain = $scope.email.userInput.split('@')[1]

      console.log('sent ', $scope.email.userInput);
      HttpFactory.sendEmail(username, domain)
       .success(function(data, status, headers, config) { 
          // if user already in system, this will show status === 'existing'
          // otherwise, status === 'new'
          console.log('success!');
          console.log('data: ', data 
                    + '\nstatus: ', status
                    + '\nheaders:', headers
                    + '\nconfig:', config);
          if (data.status === 'new') {
            local.setItem('username', username);
            local.setItem('domain', domain);
            $state.go('home.verify');
          } else if (data.status === 'existing') {
            // if existing, check if verified yet
            console.log('existing');

            HttpFactory.verify(username, domain)
              .success(function(verifyData) {
                if (verifyData.status === false) {
                  local.setItem('username', username);
                  local.setItem('domain', domain);
                  $state.go('home.verify');
                } else if (verifyData.status === true) {
                  // show error message - verified email already exists - MIGHT WANT TO UPDATE LOGIC IN FUTURE
                  console.log('user exists');
                  $scope.notUnique = true;
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
