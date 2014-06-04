angular.module('app.opinion', [
  'graph',
  'graphics',
  'API'
  ])
.controller('OpinionCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$ionicModal', 'HttpFactory', 'PointGraph',
 function($scope, $rootScope, $state, $stateParams, $ionicModal, HttpFactory, PointGraph) {
  // notify home controller that we are on opinion page
  $scope.$emit('opinion');
  $scope.coworkers = [{email: ''}];
  $scope.click = {};
  var landingDescription = 'Touch and hold on the graph below to submit your opinion';
  var noDataDescription = "There isn't any data for your domain yet! Invite your coworkers by clicking below";
  var littleDataDescription = "There isn't very much data for your domain yet! Invite your coworkers by clicking below";
  var dataDescription = "Each blue dot represents your coworkers' most recent sentiment about their success and your company's success. Check back recently for updated scores."

  var landingTitle = 'Your opinion matters!'
  var littleDataTitle = 'Invite coworkers!'
  var dataTitle = "Your coworker's sentiment"

  $scope.pageDescription = landingDescription
  $scope.titleDescription = landingTitle;

  $scope.noData = false;
  $scope.littleData = false;

  $scope.recentScore = false;

  // set coordinates and margin for graph
  $rootScope.coordinates = {
    x: 'How successful this company will be',
    y: 'How successful you will be at this company'
  };
  $scope.margin = {top: 10, right: 10, bottom: 20, left: 30};

  // tap into local storage for email and domain data  
  var local = window.localStorage;
  $scope.username = local.getItem('username');
  $scope.domain = local.getItem('domain');

  $scope.seeData = function() {
    $scope.clickSubmitted = true;
    $scope.recentScore = false;
    HttpFactory.getScores($scope.domain)
    .success(function(data) {
      $scope.$emit('coworkers');
      if (data.length === 1) {
        $scope.pageDescription = noDataDescription
        $scope.titleDescription = littleDataTitle;
        $scope.noData = true;
        $scope.completed = true;
      } else if (data.length < 50) {
        $scope.pageDescription = littleDataDescription;
        $scope.titleDescription = littleDataTitle;
        $scope.littleData = true;
        $scope.completed = true;
      } else {
        $scope.pageDescription = dataDescription;
        $scope.titleDescription = dataTitle;
        PointGraph.animate(data, $scope.margin);
      }
    });
  };

  $scope.submit = function() {
    $scope.clickSubmitted = true;
    $scope.recentScore = false;
    HttpFactory.sendScore($scope.username, $scope.domain, $scope.click.clickData)
      .success(function() {
        $scope.seeData();
      });
  };

  $scope.$on("complete", function(event) {
    $scope.$apply(function() {
      $scope.completed = true;
    });
  });
  
  $scope.refresh = function() {
    // when home broadcasts "reload" we want to reload the page to let
    // our users revote.
    $state.transitionTo($state.current, $stateParams, {
      reload: true,
      inherit: false,
      notify: true
    });
  };

  // trigger modal from home screen

  $scope.invite = function() {
    $scope.$emit('swipeInvite');
  }

  // on load, check to see if this user has submitted a score in the past
  // 24 hours or on that day. If they have, show them the see co-workers 
  // data button right away need another server endpoint for this
  HttpFactory.getIndividualScore($scope.username, $scope.domain)
  .success(function(data) {
    if (data.scores.length > 0) {
      mostRecentSubmit = new Date(data.scores[data.scores.length - 1].created);
      today = new Date();
      if (mostRecentSubmit.getYear() === today.getYear()
        && mostRecentSubmit.getMonth() === today.getMonth()
        && mostRecentSubmit.getDate() === today.getDate()) {
        $scope.seeData();
        return;
      } 
    }
    $scope.recentScore = false;
    $scope.$emit('personal');
  })
  .error(function(err) {
    console.log(err);
  });

}]);