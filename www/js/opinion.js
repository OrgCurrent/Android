angular.module('app.opinion', [
  'graph',
  'services'
  ])
.controller('OpinionCtrl', function($scope, $ionicModal, HttpFactory, PopulateGraph) {
  console.log('opinion');
  $scope.$emit('opinion');

  $scope.coordinates = {x: 'How successful you will be at this company', y: 'How successful this company will be'}

  $scope.submit = function() {
    $scope.clickSubmitted = true;
    var username = $scope.username || 'AJ';
    var domain = $scope.domain || 'test.com';
    console.log($scope.clickData);
    HttpFactory.sendScore(username, domain, $scope.clickData)
      .success(function() {
        HttpFactory.getScores(domain)
          .success(function(data) {
            PopulateGraph.dailyAvg(data.points);
          })
      })

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