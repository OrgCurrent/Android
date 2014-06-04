angular.module('app.home.settings', [])

.directive('settings', function() {
  return {
    restrict: 'EA',
    templateUrl: 'modules/settingsSide/settings.html',
    scope: true,
    controller: ['$scope', '$rootScope', '$state', '$ionicSideMenuDelegate',
      function($scope, $rootScope, $state, $ionicSideMenuDelegate) {
        var local = window.localStorage;

        $scope.changeEmail = function() {
          local.clear();
          $rootScope.$broadcast('resetStorage');
          $ionicSideMenuDelegate.toggleLeft();
          $state.go('home.email');
        }
    }]
  }  
})
