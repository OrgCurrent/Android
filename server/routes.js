var db    = require("./db"),
    email = require("./email");

var SEND_MAIL = true; // TURN ON/OFF EMAILS

exports.resendVerifyEmail = function (req, res) {
  db.userData(req.param("user"), req.param("domain")).then(function (user) {
    var query = {username: user.username, userdomain: user.userdomain};
    db.updateUser(query, {verified: false}, user).then(function (result) {
      email.sendVerifyMail(result).then(function () {
        res.send(200, {status: 'sent'});
      });
    });
  }, function (e) {
    res.send(500, {error: 'no matching record'});
  });
};

exports.verifyUserEmail = function (req, res) {
  var query = {code: req.param("code")};
  db.updateUser(query, {verified: true}).then(function (result) {
      res.send(200, "Verified, go back to the app!");
  }, function (e) {
      res.send(500, "Error. Not able to verify email.");
  });
};

exports.addUser = function (req, res) {
  db.addUser(req.param("user"), req.param("domain")).then(function (result) {
    if (result.status === 'new' && SEND_MAIL) {
      email.sendVerifyMail(result.data).then(function () {
        res.send(200, {status: 'new'});
      }, function (e) {
        res.send(500, e);
      });
    } else {
      res.send(200, {status: result.status});
    }
    }, function (e) {
      res.send(500, e);
  });
};

exports.getDomainData = function (req, res) {
  db.domainData(req.param("domain")).then(function (data) {
    res.send(200, data);
  }, function (e) {
    res.send(500, e);
  });
};

// curl -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{ "domain": "panocha.com", "mails": ["gary@panocha.com", "ted@panocha.com"]}' http://localhost:4000/invites
exports.inviteUsers = function (req, res) {
  email.sendInviteMails(req.body).then(function () {
    res.send(200, {status: 'sent'});
  }, function (e) {
    res.send(500, e);
  });
};

exports.addUserScore = function (req, res) {
  db.userData(req.param("user"), req.param("domain")).then(function (user) {
    db.addScore(user, req.params).then(function () {
      res.send(200, {status: 'success'});
    }, function (e) {
      res.send(500, e);
    });
    }, function (e) {
      res.send(500, e);
  });
};

exports.getUserData = function (req, res) {
  db.userData(req.param("user"), req.param("domain")).then(function (data) {
    res.send(200, data);
  }, function (e) {
    res.send(500, e);
  });
};

exports.getVerificationStatus = function (req, res) {
  db.userData(req.param("user"), req.param("domain")).then(function (result) {
      res.send(200, {status: result.verified});
  }, function (e) {
      res.send(500, e);
  });
};