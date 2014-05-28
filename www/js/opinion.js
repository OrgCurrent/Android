angular.module('app.opinion', [])
.controller('OpinionCtrl', function($scope) {
  console.log('opinion');
  $scope.$emit('opinion');
  $scope.pointer = false;

  $scope.clickGraph = function(event) {
    console.log(event);
    $scope.pointer = true;
  }
})