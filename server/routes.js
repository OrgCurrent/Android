var Promise = require("bluebird"),
    DB      = require("./models"),
    emails  = require("./emails"),
    uuid    = require('node-uuid');

var SEND_MAIL = false; // TURN ON/OFF EMAILS

var createUser = function (username, userdomain) {
  return new Promise (function (pass, fail) {
    DB.User.find({username: username, userdomain: userdomain}, function (err, result) {
      if (err) return fail(err);
      if (result.length !== 0) {
        return pass({status: 'existing', data: result[0]});
      } else {
        var userData = {
          username: username, 
          userdomain: userdomain, 
          code: uuid.v4()
        };
        DB.User.create(userData, function (err) {
          if (err) return fail(err);
          return pass({status: 'new', data: userData});
        });
      }
    });
  });
};

var getUserData = function (username, userdomain) {
  return new Promise (function (pass, fail) {
    DB.User.find({username: username, userdomain: userdomain}, function (err, result) {
      if (err) return fail(err);
      if (result.length !== 0) {
        return pass(result[0]);
      } else {
        return fail({error: 'user not found'});
      }
    });
  });
};

exports.resendVerifyEmail = function (req, res) {
  getUserData(req.param("user"), req.param("domain")).then(function (result) {
      emails.sendVerifyMail(result).then(function () {
        res.send(200, {status: 'sent'});
      }, function (e) {
        res.send(500, e);
      });
    }, function (e) {
      res.send(500, e);
  });
};

exports.verifyUserEmail = function (req, res) {
  var query = { code: req.param("code") };
  DB.User.update(query, { $set: { verified: true }}, {}, function (err, count) {
    if (err) res.send(500, "Error");
    count > 0 ? res.send(200, "Verified, go back to the app."):res.send(500, "Error");
  });
};

exports.addUser = function (req, res) {
  createUser(req.param("user"), req.param("domain")).then(function (result) {
    if (result.status === 'new' && SEND_MAIL) {
      emails.sendVerifyMail(result.data).then(function () {
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

exports.getVerificationStatus = function (req, res) {
  getUserData(req.param("user"), req.param("domain")).then(function (result) {
      res.send(200, result.verified);
  }, function (e) {
      res.send(500, e);
  });
};