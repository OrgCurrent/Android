angular.module('app.opinion', [
  'graph',
  'graphics',
  'API'
  ])
.controller('OpinionCtrl', ['$scope', '$state', '$stateParams', '$ionicModal', 'HttpFactory', 'PointGraph',
 function($scope, $state, $stateParams, $ionicModal, HttpFactory, PointGraph) {
  // notify home controller that we are on opinion page
  $scope.$emit('opinion');
  $scope.coworkers = [{email: ''}];
  $scope.click = {};

  $scope.noData = false;
  $scope.littleData = false;

  $scope.recentScore = false;

  // set coordinates and margin for graph
  $scope.coordinates = {
    x: '>> How successful you will be at this company >>', 
    y: '>> How successful this company will be >>'
  };
  $scope.margin = {top: 10, right: 10, bottom: 20, left: 30};

  // tap into local storage for email and domain data  
  var local = window.localStorage;
  $scope.username = local.getItem('username');
  $scope.domain = local.getItem('domain');

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
        $scope.recentScore = true;
        return;
      } 
    }
    $scope.recentScore = false;
  })
  .error(function(err) {
    console.log(err);
  });

  $scope.seeData = function() {
    $scope.clickSubmitted = true;
    $scope.recentScore = false;
    HttpFactory.getScores($scope.domain)
    .success(function(data) {
      if (data.length === 1) {
        $scope.noData = true;
        $scope.completed = true;
      } else if (data.length < 50) {
        $scope.littleData = true;
        $scope.completed = true;
      } else {
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
    $scope.$emit('invite');
  }


  // MODAL TO INVITE COWORKERS // NOW IN HEADER
  // $scope.coworkers = [{email: ''}];
  // $scope.addEmail = function() {
  //   $scope.coworkers.push({email: ''});
  // }

  // $ionicModal.fromTemplateUrl('../templates/modal.html', {
  //   scope: $scope,
  //   animation: 'slide-in-up'
  // }).then(function(modal) {
  //   $scope.modal = modal;
    
  //   $scope.invite = function() {
  //     $scope.modal.show();
  //   };
  //   $scope.closeModal = function() {
  //     $scope.modal.hide();
  //   };
  //   //Cleanup the modal when we're done with it!
  //   $scope.$on('$destroy', function() {
  //     $scope.modal.remove();
  //   });
  //   // Execute action on hide modal
  //   $scope.$on('modal.hide', function() {
  //     // Execute action
  //   });
  //   // Execute action on remove modal
  //   $scope.$on('modal.removed', function() {
  //     // Execute action
  //   });
  // });

  // $scope.sendInvites = function() {
  //   console.log('Format email, send to provided emails');
  //   for (var i = 0; i < $scope.coworkers.length; i++) {
  //     console.log($scope.coworkers[i].email);
  //   }
  //   $scope.coworkers = [{email: ''}];
  // }
  // // MODAL TO INVITE COWORKERS //
}]);