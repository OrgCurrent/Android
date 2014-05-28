var Promise = require("bluebird"),
    crypto  = require("crypto"),
    DB      = require("./models"),
    emails  = require("./emails");

var SEND_MAIL = false; // TURN ON EMAILS

var createUser = function (username, userdomain) {
  return new Promise (function (pass, fail) {
    DB.User.find({username: username, userdomain: userdomain}, function (err, result) {
      if (err) return fail(err);
      if (result.length !== 0) {
        return pass({status: 'existing', data: result[0]});
      } else {
        crypto.randomBytes(24, function(err, buffer) {
          if (err) return fail(err);
          var userData = {
            username: username, 
            userdomain: userdomain, 
            code: buffer.toString('hex')
          };
          DB.User.create(userData, function (err) {
            if (err) return fail(err);
            return pass({status: 'new', data: userData});
          });
        });
      }
    });
  });
};

var getUserStatus = function (username, userdomain) {
  return new Promise (function (pass, fail) {
    DB.User.find({username: username, userdomain: userdomain}, function (err, result) {
      if (err) return fail(err);
      if (result.length !== 0) {
        return pass({status: result[0].verified });
      } else {
        fail({error: 'user not found'});
      }
    });
  });
};

exports.addUser = function (req, res) {
  createUser(req.param("user"), req.param("domain")).then(function (result) {
    if (result.status === 'new' && SEND_MAIL) {
      emails.sendVerifyMail(result).then(function () {
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
  getUserStatus(req.param("user"), req.param("domain")).then(function (result) {
      res.send(200, result);
  }, function (e) {
      res.send(500, e);
  });
};