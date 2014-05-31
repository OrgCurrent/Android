// app.get('/user/add/:user/:domain', route.addUser);

// app.get('/user/resend/:user/:domain', route.resendVerifyEmail);
// app.get('/user/verified/:user/:domain', route.getVerificationStatus);

// app.get('/user/score/:user/:domain/:x/:y', route.addUserScore);
// app.get('/domain/data/:domain', route.getDomainData);
//http://graphs.delimited.io/domain/data/spacewalking.com

// don't worry about 
// app.get('/user/verification/:code', route.verifyUserEmail);
// app.get('/user/data/:user/:domain', route.getUserData);

//http://graphs.delimited.io/user/verified/andrew/spacewalking.com

angular.module('services', [])

.factory('HttpFactory', function($http) {
  return {
    // jq: function(username, domain) {
    //   console.log('jquery');
    //   $.ajax({
    //     url: 'http://graphs.delimited.io/user/add/acjones617/gmail.com',
    //     type: 'GET',
    //     dataType: 'json',
    //     //beforeSend: function(xhr) {
    //       //xhr.setRequestHeader("x-some-header", "some-value");
    //     //}
    //   });
    // },
    // app.get('/user/verified/:user/:domain', route.getVerificationStatus);
    verify: function(username, domain) {
      return $http({
        url: 'http://graphs.delimited.io/user/verified/' + username + '/' + domain,
        method: 'GET',
      })
    },
    // app.get('/user/add/:user/:domain', route.addUser);
    sendEmail: function(username, domain) {
      return $http({
        method: 'GET',
        url: 'http://graphs.delimited.io/user/add/' + username + '/' + domain,
        headers: {'Content-Type': 'application/json'}
      });
    },
    // app.get('/user/resend/:user/:domain', route.resendVerifyEmail);
    resendEmail: function(username, domain) {
      return $http({
        method: 'GET',
        url: 'http://graphs.delimited.io/user/resend/' + username + '/' + domain,
        headers: {'Content-Type': 'application/json'}
      });
    },
    //app.get('/user/score/:user/:domain/:x/:y', route.addUserScore);
    sendScore: function(username, domain, score) {
      return $http({
        method: 'GET',
        url: 'http://graphs.delimited.io/user/score/' + username + '/' + domain + '/' + score[0] + '/' + score[1],
        headers: {'Content-Type': 'application/json'}
      });
    },
    //app.get('/domain/data/:domain', route.getDomainData);
    getScores: function(domain) {
      return $http({
        method: 'GET',
        url: 'http://graphs.delimited.io/domain/data/' + domain,
      });
    },
    // sendScore: function(username, domain, score) {
    //   return $http({
    //     method: 'GET',
    //     url: '/dummyData/send',
    //     headers: {'Content-Type': 'application/json'}
    //   });
    // },
    // getScores: function(domain) {
    //   return $http({
    //     method: 'GET',
    //     url: '/dummyData'
    //   });
    // }
    getUser: function() {
      return $http({
        method: 'GET',
        url: '/userInfo'
      });
    },
    postUser: function(username, domain) {
      return $http({
        data: JSON.stringify({username: username, domain: domain}),
        method: 'POST',
        url: '/userInfo'
      });
    }

  }
})