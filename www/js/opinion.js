angular.module('app.opinion', [
  'graph',
  'services'
  ])
.controller('OpinionCtrl', function($scope, $ionicModal, HttpFactory, CircleGraph) {
  console.log('opinion');
  $scope.$emit('opinion');

  $scope.coordinates = {x: 'How successful you will be at this company', y: 'How successful this company will be'};
  $scope.margin = {top: 10, right: 10, bottom: 20, left: 25};
  console.log($scope.margin);

  $scope.submit = function() {
    $scope.clickSubmitted = true;
    // $scope.percentDone = 50;
    var username = $scope.username || 'AJ';
    var domain = $scope.domain || 'test.com';
    console.log($scope.clickData);
    HttpFactory.sendScore(username, domain, $scope.clickData)
      .success(function() {
        HttpFactory.getScores(domain)
          .success(function(data) {
            CircleGraph.dailyAvg(data.points, $scope.margin);
          });
      });

  };

  // $scope.clickGraph = function(event) {
  //   console.log(event);
  //   $scope.pointer = true;
  //   $scope.r = 10;
  //   $scope.cx = event.offsetX;
  //   $scope.cy = event.offsetY;
  //   $scope.showCircle = true;
  // };
    
});