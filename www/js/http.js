angular.module('services', [])

.factory('HttpFactory', ['$http', function($http) {
  var serverDomain = 'http://162.209.111.20/';

  return {
    verify: function(username, domain) {
      return $http({
        method: 'GET',
        url: serverDomain + 'user/verified/' + username + '/' + domain,
      })
    },
    // app.get('/user/add/:user/:domain', route.addUser);
    sendEmail: function(username, domain) {
      return $http({
        method: 'GET',
        url: serverDomain + 'user/add/' + username + '/' + domain,
      });
    },
    // app.get('/user/resend/:user/:domain', route.resendVerifyEmail);
    resendEmail: function(username, domain) {
      return $http({
        method: 'GET',
        url: serverDomain + 'user/resend/' + username + '/' + domain,
      });
    },
    //app.get('/user/score/:user/:domain/:x/:y', route.addUserScore);
    sendScore: function(username, domain, score) {
      return $http({
        method: 'GET',
        url: serverDomain + 'user/score/' + username + '/' + domain + '/' + score[0] + '/' + score[1],
      });
    },
    //app.get('/domain/data/:domain', route.getDomainData);
    getScores: function(domain) {
      return $http({
        method: 'GET',
        url: serverDomain + 'domain/data/' + domain,
      });
    },

    getIndividualScore: function(username, domain) {
      return $http({
        method: 'GET',
        url: serverDomain + 'user/data/' + username + '/' + domain
      })
    }
  }
}]);