angular.module('app.opinion', [
  'graph',
  'graphics',
  'services'
  ])
.controller('OpinionCtrl', function($scope, $rootScope, $state, $stateParams, $ionicModal, HttpFactory, CircleGraph, LineGraph) {
  $scope.$emit('opinion');
  $scope.coworkers = [{email: ''}];

  $scope.coordinates = {x: '>> How successful you will be at this company >>', y: '>> How successful this company will be >>'};
  $scope.margin = {top: 10, right: 10, bottom: 20, left: 30};

  $scope.$on('status', function(event, data) {
    console.log(event, data);
    $scope.$apply(function() {
      $scope.percentDone = data;
    });
  });
  
  $scope.percentDone = 0;

  $scope.submit = function() {
    $scope.clickSubmitted = true;
    var username = $rootScope.username
    var domain = $rootScope.domain
    console.log($scope.clickData);
    HttpFactory.sendScore(username, domain, $scope.clickData)
      .success(function() {
        HttpFactory.getScores(domain)
          .success(function(data) {
            // CircleGraph.dailyAvg(data.points, $scope.margin);
            LineGraph.dailyAvg(data, $scope.margin);
          });
      });

  };

  $scope.$on('reload', function() {
    console.log('trying to reload');
    // $state.reload();
    $state.transitionTo($state.current, $stateParams, {
      reload: true,
      inherit: false,
      notify: true
    });
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
    
});