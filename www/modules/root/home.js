angular.module('app.home', [
  'API',
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
    $scope.email = 'active-step';
    $scope.verify = '';
    $scope.opinion = '';
    $scope.showSettings = false;
  });

  $scope.$on("verify", function(event, user) {
    $scope.verified = false;
    $scope.email = 'completed-step';
    $scope.verify = 'active-step';
    $scope.opinion = '';
    $scope.showSettings = true;
  });
  
  $scope.$on("opinion", function(event, user) {
    $scope.verified = true;
    $scope.completed = false;
    $scope.showSettings = true;
  });

  $scope.$on('coworkers', function(event) {
    console.log('coworkers!')
    // $scope.$apply(function() {
      $scope.personal = 'completed-step';
      $scope.coworkers = 'active-step';
    // })
  });

  $scope.$on('personal', function(event) {
    console.log('personal!')
    // $scope.$apply(function() {
      $scope.personal = 'active-step';
      $scope.coworkers = '';
    // })
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

  $scope.subtractEmail = function($index) {
    $scope.coworkers.splice($index, 1);
  }

  // when you swipe left, invites are opened up
  $scope.$on('swipeInvite', function() {
    $scope.invite();
  })

  $ionicModal.fromTemplateUrl('modules/invite/invite.html', {
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

}])

.directive('homePage', ['$ionicGesture', '$rootScope',
  function($ionicGesture, $rootScope) {

  var link = function(scope, element, attr) {
    $ionicGesture.on('swipeleft', callback, element);
  }

  var callback = function() {
    $rootScope.$broadcast('swipeInvite');
  }

  return {
    restrict: 'EA',
    templateUrl: 'modules/root/headers.html',
    link: link
  }
   
}]);
