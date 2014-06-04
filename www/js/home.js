angular.module('app.home', [
  'services',
  'app.home.settings'
  ])
.controller('HomeCtrl', ['$scope', '$rootScope', '$state', '$ionicModal', '$ionicSideMenuDelegate', 'HttpFactory', 
  function($scope, $rootScope, $state, $ionicModal, $ionicSideMenuDelegate, HttpFactory) {

  var local = window.localStorage;

  var resetStorage = function() {
    $scope.username = local.getItem('username');
    $scope.domain = local.getItem('domain');
  };

  resetStorage();

  $scope.$on('resetStorage', resetStorage);

  if (local.getItem('username')) {
    HttpFactory.verify(local.getItem('username'), local.getItem('domain'))
      .success(function(verifyData) {
        // user not verified
        if (verifyData.status === false) {
          $state.go('home.verify');
        }
        // user is verified
        else if (verifyData.status === true) {
          $state.go('home.opinion');
        }
      })
      .error(function() {
        // user not found
        $state.go('home.email');
      });
  } else {
    // no user on this app yet
    $state.go('home.email');
  }

  $scope.$on("email", function(event, user) {
    $scope.verified = false;
    $scope.email = 'button-balanced';
    $scope.verify = '';
    $scope.opinion = '';
  });

  $scope.$on("verify", function(event, user) {
    $scope.verified = false;
    $scope.email = '';
    $scope.verify = 'button-balanced';
    $scope.opinion = '';
  });
  
  $scope.$on("opinion", function(event, user) {
    $scope.verified = true;
    $scope.completed = false;
  });

  // SETTINGS TO RESET EMAIL //
  $scope.toggleSettings = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };


  // MODAL TO INVITE COWORKERS //
  $scope.coworkers = [{email: ''}];
  $scope.addEmail = function() {
    $scope.coworkers.push({email: ''});
  }

  $scope.$on('invite', function() {
    $scope.invite();
  })

  $ionicModal.fromTemplateUrl('../templates/modal.html', {
    scope: $scope,
    animation: 'slide-left-right'
  }).then(function(modal) {
    $scope.modal = modal;
    
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
  });

  $scope.sendInvites = function() {
    console.log('Format email, send to provided emails');
    for (var i = 0; i < $scope.coworkers.length; i++) {
      console.log($scope.coworkers[i].email);
    }
    $scope.coworkers = [{email: ''}];
  }
  // MODAL TO INVITE COWORKERS //

}]);
