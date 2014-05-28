var Promise = require("bluebird"),
    crypto  = require("crypto"),
    DB      = require("./models"),
    emails  = require("./emails");

var createUser = function (username, userdomain) {
  return new Promise (function (pass, fail) {
    DB.User.find({username: username, userdomain: userdomain}, function (err, result) {
      if (err) fail();
      if (result.length !== 0) {
        pass({status: 'existing'});
      } else {
        crypto.randomBytes(24, function(err, buffer) {
          if (err) fail();
          var userData = {
            username: username, 
            userdomain: userdomain, 
            code: buffer.toString('hex')
          };
          DB.User.create(userData, function (err) {
            if (err) fail();
              pass(userData);
          });
        });
      }
    });
  });
};

exports.addUser = function (req, res) {
  createUser(req.param("user"), req.param("domain")).then(
    emails.sendVerifyMail()).then(function (data) {
    res.send(200, data);
  }).catch(function (data) {
    res.send(500, data);
  });
};




// exports.addUser = function (req, res) {
//   createUser(req.param("user"), req.param("domain")).then(function (data) {
//     res.send(200, data);
//   }).catch(function (data) {
//     res.send(500, data);
//   });
// };