var mailer = require("nodemailer"),
    config = require("./server_config/settings");

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
    text: "Hello world",
    html: "<b>Hello world</b>"
}

smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }

    smtpTransport.close(); // shut down the connection pool, no more messages
});