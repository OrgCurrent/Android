angular.module('services', [])

.factory('HttpFactory', function($http) {
  return {
    verify: function(username, domain) {
      $http({
        url: 'user/verified/username/domain',
        method: 'GET',
      })
    },
    sendEmail: function(username, domain) {
      return $http({
        method: 'POST',
        url: 'user/add/' + username + '/' + domain,
        data: JSON.stringify({email: username + '@' + domain}),
        headers: {'Content-Type': 'application/json'}
      })
    }
  }
})