angular.module('app.email', [
  'services'
  ])

.controller('EmailCtrl', function($scope, $http, HttpFactory, $state){
  console.log('email');
  $scope.$emit('email');
  $scope.submitted = false;
  $scope.email = {};

  $scope.sendEmail = function() {
    if($scope.email_form.$valid) {
      
      var username = $scope.email.userInput.split('@')[0]
      var domain = $scope.email.userInput.split('@')[1]

      console.log('sent ', $scope.email.userInput); // 'keith@email.com'
      HttpFactory.sendEmail(username, domain)
       .success(function(data, status, headers, config) { 
          // called when response is ready
          console.log('success!');
          console.log('data: ', data 
                    + '\nstatus: ', status
                    + '\nheaders:', headers
                    + '\nconfig:', config);
          if (data.status === 'new') {
            $state.go('home.verify');
          } else if (data.status === 'existing') {
            HttpFactory.verify(username, domain)
              .success(function(data) { 
                if (data.status === true) {
                  $state.go('home.opinion');
                } else {
                  HttpFactory.resendEmail(username,domain)
                    .success(function() {
                      $state.go('home.verify');
                    })
                    .error(function(data) {
                      console.log('error', data);
                    })
                }
              })
          }
      })
      .error(function(data, status, headers, config) { // This is called when the response
          // comes back with an error status
          // called when response is ready
          console.log('error!')
          console.log('data: ', data 
                    + '\nstatus: ', status
                    + '\nheaders', headers
                    + '\nconfig', config)
      });
    } else {
      $scope.email_form.submitted = true;
    }
  }
})
