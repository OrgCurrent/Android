var express = require('express'),
    path    = require('path'),
    http    = require('http'),
    data    = require('./routes.js');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 4000);
    app.use(express.compress());
    app.use(express.logger('tiny')); // 'default', 'short', 'tiny', 'dev'
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, '../client')));
});

app.get('/user/add/:user/:domain', data.addUser);
app.get('/user/verified/:user/:domain', data.getVerificationStatus);
app.get('/user/verification/:code', data.verifyUserEmail);
app.get('/user/resend/:user/:domain', data.resendVerifyEmail);
app.get('/user/score/:user/:domain/:x/:y', data.addUserScore);
app.get('/user/data/:user/:domain', data.getUserData);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});