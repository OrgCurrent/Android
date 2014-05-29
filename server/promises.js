var Promise   = require("bluebird"),
    uuid      = require("node-uuid"),
    templates = require("email-templates"),
    DB        = require("./models"),
    config    = require("./server_config/config");

exports.verifyUser = function (code) {
  return new Promise (function (pass, fail) {
    var query = {code: code};
    DB.User.update(query, { $set: {verified: true}}, {}, function (err, count) {
        if (err) return fail(err);
        if (count > 0) {
          return pass();
        } else {
          return fail('no matching record')
        }
    });
  });
};

exports.addUser = function (username, userdomain) {
  return new Promise (function (pass, fail) {
    DB.User.findOne({username: username, userdomain: userdomain}, function (err, result) {
      if (err) return fail(err);
      if (result) {
        return pass({status: 'existing', data: result});
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

exports.domainData = function (userdomain) {
  return new Promise (function (pass, fail) {
    DB.User.find({userdomain: userdomain}, 'username scores', function (err, result) {
      if (err) return fail(err);
      if (result.length !== 0) {
        return pass(result);
      } else {
        return fail({error: 'domain not found'});
      }
    });
  });
};

exports.userData = function (username, userdomain) {
  return new Promise (function (pass, fail) {
    DB.User.findOne({username: username, userdomain: userdomain}, function (err, result) {
      if (err) return fail(err);
      if (result) {
        return pass(result);
      } else {
        return fail({error: 'user not found'});
      }
    });
  });
};

exports.addScore = function (user, params) {
  return new Promise (function (pass, fail) {
    var score = DB.Score({x: params.x, y: params.y, version: '1.0'});
    user.scores.push(score);
    user.save(function (err) {
      if (err) return fail({error: 'score not saved'});
      return pass();
    });
  });
};

exports.sendVerifyMail = function (context) {
  return new Promise (function (pass, fail) {
    templates(__dirname + '/email-templates/', function(err, template) {
      if (err) return fail(err);

      context.path = config.path;

      template('verify', context, function(err, html, text) {
        if (err) return fail();
        config.transport.sendMail({
          from: config.email.verify.from,
          to: config.email.test_user.user,
          subject: 'Please Verify Your Email Address',
          html: html,
          text: text
        }, function(err, responseStatus) {
          if (err) return fail(err);
          config.transport.close();
          return pass(responseStatus.message);
        });
      });
    });
  });
};

