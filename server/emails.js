var fs             = require("fs"),
    templates      = require('email-templates')
    config         = require("./server_config/settings"),
    Promise        = require("bluebird");

var templatesDirectory = __dirname + '/email-templates/';

exports.sendVerifyMail = function (data) {
  return new Promise (function (pass, fail) {
    templates(templatesDirectory, function(err, template) {
      if (err) return fail();

      var transport = config.transport;

      template('verify', data, function(err, html, text) {
        if (err) return fail();
        transport.sendMail({
          from: config.from,
          to: config.email.test_user.user,
          subject: 'Please Verify Your Email Address',
          html: html,
          text: text
        }, function(err, responseStatus) {
          if (err) return fail();
          transport.close();
          pass(responseStatus.message);
        });
      });
    });
  });
};






