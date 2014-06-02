angular.module('app.opinion', [
  'graph',
  'graphics',
  'services'
  ])
.controller('OpinionCtrl', ['$scope', '$state', '$stateParams', '$ionicModal', 'HttpFactory', 'PointGraph',
 function($scope, $state, $stateParams, $ionicModal, HttpFactory, PointGraph) {
  // notify home controller that we are on opinion page
  $scope.$emit('opinion');
  $scope.coworkers = [{email: ''}];
  $scope.click = {};

  // set coordinates and margin for graph
  $scope.coordinates = {x: '>> How successful you will be at this company >>', y: '>> How successful this company will be >>'};
  $scope.margin = {top: 10, right: 10, bottom: 20, left: 30};

  // tap into local storage for email and domain data  
  var local = window.localStorage;
  $scope.username = local.getItem('username');
  $scope.domain = local.getItem('domain');

  $scope.submit = function() {
    $scope.clickSubmitted = true;
    HttpFactory.sendScore($scope.username, $scope.domain, $scope.click.clickData)
      .success(function() {
        HttpFactory.getScores($scope.domain)
          .success(function(data) {
            PointGraph.animate(data, $scope.margin);
          });
      });
  };

  $scope.$on("complete", function(event) {
    $scope.$apply(function() {
      $scope.completed = true;
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
  });


  // MODAL TO INVITE coworkers
  $scope.coworkers = [{email: ''}];
  $scope.addEmail = function() {
    $scope.coworkers.push({email: ''});
  }

  $ionicModal.fromTemplateUrl('../templates/modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.invite = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hide', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

  $scope.sendInvites = function() {
    console.log('Format email, send to provided emails');
    for (var i = 0; i < $scope.coworkers.length; i++) {
      console.log($scope.coworkers[i].email);
    }
    $scope.coworkers = [{email: ''}];
  }
}]);