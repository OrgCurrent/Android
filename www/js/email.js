angular.module('app.email', [])
.controller('EmailCtrl', function($scope) {
  console.log('email');
  $scope.$emit('email');
})