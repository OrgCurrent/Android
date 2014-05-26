var fs         = require("fs"),
    mailer     = require("nodemailer"), 
    config     = require("./server_config/settings"),
    Handlebars = require("handlebars");

var template, html;
var templatePath = __dirname + '/mail-templates/responsive/base_boxed_basic_query.html';
var source = fs.readFile(templatePath, 'utf8', function (err, file) {
    template = file;
    console.log("template", template);
});

var smtpTransport = mailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: config.user,
        pass: config.pass
    }
});

var mailOptions = {
    from: config.from,
    to: config.test,
    subject: "Please Verify Your Email Address",
    html: template
}

smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }

    smtpTransport.close(); // shut down the connection pool, no more messages
});