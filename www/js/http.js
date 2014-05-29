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
    },
    sendScore: function(username, domain, score) {
      var data = {
        email: username + '@' + domain,
        score: score
      };
      return $http({
        method: 'POST',
        url: 'user/score/' + username + '/' + domain,
        data: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
      })
    },
    getScores: function(domain) {
      return $http({
        method: 'GET',
        url: 'domain/scores/' + domain,
      })
    }


  }
})