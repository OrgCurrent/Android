angular.module('app.email', [
  'services'
  ])

.controller('EmailCtrl', function($scope, $http, HttpFactory, $state){
  console.log('email');
  $scope.$emit('email');
  $scope.submitted = false;
  $scope.email = {};

$scope.email.userInput

  $scope.sendEmail = function() {
    if($scope.email_form.$valid) {
      
      $scope.email.username = $scope.email.userInput.split('@')[0]
      $scope.email.domain = $scope.email.userInput.split('@')[1]

      console.log('sent ', $scope.email.userInput); // 'keith@email.com'
      HttpFactory.sendEmail($scope.email.username, $scope.email.domain)
       .success(function(data, status, headers, config) { 
          // called when response is ready
          console.log('success!');
          console.log('data: ', data 
                    + '\nstatus: ', status
                    + '\nheaders:', headers
                    + '\nconfig:', config);
          $state.go('home.verify');
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
