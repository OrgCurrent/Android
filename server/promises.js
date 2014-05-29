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

exports.userData = function (username, userdomain) {
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

