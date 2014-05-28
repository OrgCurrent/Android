var Promise = require("bluebird"),
    DB      = require("./models"),
    uuid    = require('node-uuid');


exports.checkStatus = function (username, userdomain) {
  return new Promise (function (pass, fail) {
    var query = { code: req.param("code") };
    DB.User.update(query, { $set: { verified: true }}, {}, function (err, count) {
        if (err) res.send(500, "Error");
        count > 0 ? res.send(200, "Verified, go back to the app."):res.send(500, "Error");
    });
  });
};

exports.addUser = function (username, userdomain) {
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

exports.getUserData = function (username, userdomain) {
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