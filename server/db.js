var Promise = require("es6-promise").Promise,
    uuid    = require("node-uuid"),
    model   = require("./models");

exports.updateUser = function (query, attrs, user) {
  return new Promise (function (onResolved, onRejected) {
    model.User.update(query, { $set: attrs}, {}, function (err, count) {
        if (err) onRejected(err);
        if (count > 0) {
          onResolved(user);
        } else {
          onRejected({error: 'no matching record'})
        }
    });
  });
};

exports.addUser = function (username, userdomain) {
  return new Promise (function (onResolved, onRejected) {
    model.User.findOne({username: username, userdomain: userdomain}, function (err, result) {
      if (err) onRejected(err);
      if (result) {
        onResolved({status: 'existing', data: result});
      } else {
        var userData = {
          username: username, 
          userdomain: userdomain, 
          code: uuid.v4()
        };
        model.User.create(userData, function (err) {
          if (err) onRejected(err);
          onResolved({status: 'new', data: userData});
        });
      }
    });
  });
};

exports.domainData = function (userdomain) {
  return new Promise (function (onResolved, onRejected) {
    model.User.find({userdomain: userdomain}, 'username scores', function (err, result) {
      if (err) onRejected(err);
      if (result.length !== 0) {
        onResolved(result);
      } else {
        onRejected({error: 'domain not found'});
      }
    });
  });
};

exports.userData = function (username, userdomain) {
  return new Promise (function (onResolved, onRejected) {
    model.User.findOne({username: username, userdomain: userdomain}, function (err, result) {
      if (err) onRejected(err);
      if (result) {
        onResolved(result);
      } else {
        onRejected({error: 'user not found'});
      }
    });
  });
};

exports.addScore = function (user, params) {
  return new Promise (function (onResolved, onRejected) {
    var score = model.Score({x: params.x, y: params.y, version: '1.0'});
    user.scores.push(score);
    user.save(function (err) {
      if (err) onRejected({error: 'score not saved'});
      onResolved();
    });
  });
};

