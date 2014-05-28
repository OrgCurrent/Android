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

// exports.addUser = function (req, res) {
//   createUser(req.param("user"), req.param("domain")).then(function (data) {
//     res.send(200, data);
//   }).catch(function (data) {
//     res.send(500, data);
//   });
// };