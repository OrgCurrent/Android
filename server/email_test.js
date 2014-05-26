var fs             = require("fs"),
    mailer         = require("nodemailer"),
    templates      = require('email-templates')
    config         = require("./server_config/settings"),
    Handlebars     = require("handlebars");

templates(__dirname + '/email-templates/', function(err, template) {

  if (err) throw err;

  var transport = mailer.createTransport("SMTP",{
      service: "Gmail",
      auth: {
          user: config.user,
          pass: config.pass
      }
  });

  var locals = {
    email: 'user@example.com',
    buttons: {
      link1: '5456h6hfghhghfghfghfgh',
      link2: 'rtytrtytyrthynbytvgvgg'
    }
  };

  template('verify', locals, function(err, html, text) {
    if (err) {
      console.log(err);
    } else {
      transport.sendMail({
        from: config.from,
        to: config.test,
        subject: 'Happy Meter | Please Verify Your Email',
        html: html,
        text: text
      }, function(err, responseStatus) {
        if (err) {
          console.log(err);
        } else {
          console.log(responseStatus.message);
          transport.close();
        }
      });
    }
  });
});
