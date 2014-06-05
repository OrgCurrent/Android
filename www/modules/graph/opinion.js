angular.module('app.opinion', [
  'graph',
  'graphics',
  'API'
  ])
.controller('OpinionCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$ionicModal', 'HttpFactory', 'PointGraph',
 function($scope, $rootScope, $state, $stateParams, $ionicModal, HttpFactory, PointGraph) {
  // notify home controller that we are on opinion page
  $scope.$emit('opinion');
  $scope.$emit('personal');

  $scope.coworkers = [{email: ''}];
  $scope.click = {};

  // pre-personal submit
  var landingTitle = 'Your opinion matters!'
  var introLanding = "Touch and hold on the graph below";
  var landing = "Touch and hold on the graph below to submit your opinion in order to see your coworkers' sentiments";

  // if too little data to see coworker data
  var littleDataTitle = 'Invite coworkers!'
  var introLittleData = "There isn't very much data for your domain";
  var littleData = "There isn't very much data for your domain yet! Invite your coworkers by clicking in the upper right. You will able to resubmit your sentiments tomorrow.";
  var refreshLittleData = "Refresh to see if there's enough data yet"

  // coworker data displayed
  var dataTitle = "Your coworker's sentiment"
  var introDataDescription = "Each blue dot represents your coworkers' most";
  var dataDescription = "Each blue dot represents your coworkers' most recent sentiments about their own success and your company's success. Check back frequently for updated scores.";
  var refreshData = "Refresh page to get the latest data!"
  
  // widget for minimizing text on page until
  // button clicked
  $scope.showingFullPage = false;
  $scope.showFullPage = function() {
    $scope.showingFullPage = true;
  }

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

    // when opinion submitted
  $scope.submit = function() {
    $scope.clickSubmitted = true;
    HttpFactory.sendScore($scope.username, $scope.domain, $scope.click.clickData)
    .success(function() {
      $scope.seeData();
    });
  };

  $scope.seeData = function() {
    $scope.clickSubmitted = true;
    $scope.showingFullPage = false;
    HttpFactory.getScores($scope.domain)
    .success(function(data) {
      // $scope.coworkerData = true;
      // too little coworker data to display
      if (data.length < 50) {
        $scope.titleDescription = littleDataTitle;
        // $scope.coworkerData = true;
        $scope.refreshButton = refreshLittleData;

        // refresh button shown when completed = true
        $scope.completed = true;
        $scope.pageIntro = introLittleData;
        $scope.pageFull = littleData;
      } else {
        // show user to "coworkers data", #2 on arrow flow
        $scope.$emit('coworkers');
        $scope.titleDescription = dataTitle;
        $scope.refreshButton = refreshData;
        $scope.pageIntro = introDataDescription;
        $scope.pageFull = dataDescription;

        // animate with coworker data
        PointGraph.animate(data, $scope.margin, $scope.domain);
        // when animation complete, show refresh button
        $scope.$on("complete", function(event) {
          $scope.$apply(function() {
            $scope.completed = true;
          });
        });
      }
    });
  };

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
    // user submission is "due"
    $scope.titleDescription = landingTitle;
    $scope.pageIntro = introLanding
    $scope.pageFull = landing

    // tells subheader to show us on step 1
    $scope.$emit('personal');
  })
  .error(function(err) {
    console.log(err);
  });

  $scope.refresh = function() {
    // when refresh button touched or swipedown, refresh page
    $state.transitionTo($state.current, $stateParams, {
      reload: true,
      inherit: false,
      notify: true
    });
  };

  $scope.$on("swipeDown", function() {
    $scope.refresh();
  });
  

  // when invite button clicked, trigger invite modal from home.
  $scope.invite = function() {
    $scope.$emit('swipeInvite');
  }

}]);