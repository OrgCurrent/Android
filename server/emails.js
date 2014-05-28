var fs        = require("fs"),
    Promise   = require("bluebird"),
    templates = require('email-templates'),
    config    = require("./server_config/settings");

exports.sendVerifyMail = function (data) {
  return new Promise (function (pass, fail) {
    templates(__dirname + '/email-templates/', function(err, template) {
      if (err) return fail(err);

      var transport = config.transport;
      template('verify', data, function(err, html, text) {
        if (err) return fail();
        transport.sendMail({
          from: config.email.verify.from,
          to: config.email.test_user.user,
          subject: 'Please Verify Your Email Address',
          html: html,
          text: text
        }, function(err, responseStatus) {
          if (err) return fail(err);
          transport.close();
          return pass(responseStatus.message);
        });
      });
    });
  });
};






