// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('happyMeter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller('EmailController', function($scope, $http){
  $scope.submitted = false;


  $scope.sendEmail = function(){
    if($scope.email_form.$valid){
      
      $scope.email = {
        email : $scope.email
      }
      console.log('sent ', $scope.email); // 'keith@email.com'
      $http({
        method: 'POST',
        url: 'http://localhost:4000/user/add/andy/gmail',
        data: JSON.stringify($scope.email),
        headers: {'Content-Type': 'application/json'}
      })
      .success(function(data, status, headers, config) { 
          // called when response is ready
          console.log('success!')
          console.log('data: ', data 
                    + '\nstatus: ', status
                    + '\nheaders:', headers
                    + '\nconfig:', config)
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
    }else{
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





