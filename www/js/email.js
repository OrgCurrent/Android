angular.module('app.email', [
  'services'
  ])

.controller('EmailCtrl', ['$scope', '$rootScope', '$http', 'HttpFactory', '$state',
  function($scope, $rootScope, $http, HttpFactory, $state){
  console.log('email');
  $scope.$emit('email');
  $scope.submitted = false;
  $scope.email = {};

  $scope.sendEmail = function() {

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
            HttpFactory.postUser(username, domain)
              .success(function() {
                console.log($rootScope.domain);
                $rootScope.username = username;
                $rootScope.domain = domain;
                $state.go('home.verify');
              })

          } else if (data.status === 'existing') {
            // if existing, check if verified yet
            console.log('existing');
            HttpFactory.verify(username, domain)
              .success(function(verifyData) {
                if (verifyData.status === false) {
                  // user exists, but not verified yet - send along to verify page
                  HttpFactory.postUser(username, domain)
                    .success(function() {
                      $rootScope.username = username;
                      $rootScope.domain = domain;
                      $state.go('home.verify');
                    });
                } else if (verifyData.status === true) {
                  // show error message - verified email already exists - MIGHT WANT TO UPDATE LOGIC IN FUTURE
                  console.log('user exists');
                  $scope.notUnique = true;
                }
              })

            // HttpFactory.verify(username, domain)
            //   .success(function(data) { 
            //     if (data.status === true) {
            //       $state.go('home.opinion');
            //     } else {
            //       HttpFactory.resendEmail(username,domain)
            //         .success(function() {
            //           $state.go('home.verify');
            //         })
            //         .error(function(data) {
            //           console.log('error', data);
            //         })
            //     }
            //  })
          }
      })
      .error(function(data, status, headers, config) {
          // server error
          console.log('error!')
          console.log('data: ', data 
                    + '\nstatus: ', status
                    + '\nheaders', headers
                    + '\nconfig', config)
          $scope.serverError = true;
      });
    } else {
      $scope.email_form.submitted = true;
    }
  }
}]);
