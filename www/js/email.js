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

/*
.directive('ensureUnique', function($http) { 
  return {
    require: 'ngModel',
    link: function(scope, ele, attrs, c) {
      scope.$watch(attrs.ngModel, function(n) { if (!n) return;
        $http({
          method: 'POST',
          url: '/api/check/'+attrs.ensureUnique,
          data: {'field': attrs.ensureUnique}
        }).success(function(data) { 
          c.$setValidity('unique', data.isUnique);
        }).error(function(data) { 
          c.$setValidity('unique', false);
        }); 
      });
    } 
  }
});*/
