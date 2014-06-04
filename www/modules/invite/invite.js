angular.module('app.home.invite', [])

.directive('inviteCoWorkers', function () {
  return {
    restrict: 'EA',
//    templateUrl: 'modules/invite/invite.html',
//    scope: true,
    controller: ['$scope', '$ionicSideMenuDelegate',
      function($scope, $ionicSideMenuDelegate) {
      $scope.$on('invite', function() {
        $scope.invite();
      })

      $ionicModal.fromTemplateUrl('../modules/invite/invite.html', {
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
    }]);
  }
