angular.module('app.opinion', [
  'graph'
  ])
.controller('OpinionCtrl', function($scope, $ionicModal) {
  console.log('opinion');
  $scope.$emit('opinion');

  $scope.submit = function() {
    console.log($scope.clickData);
  };

  // $scope.clickGraph = function(event) {
  //   console.log(event);
  //   $scope.pointer = true;
  //   $scope.r = 10;
  //   $scope.cx = event.offsetX;
  //   $scope.cy = event.offsetY;
  //   $scope.showCircle = true;
  // };
    
})