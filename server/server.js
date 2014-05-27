var express = require('express'),
    path = require('path'),
    http = require('http'),
    data = require('./routes.js');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 4000);
    app.use(express.compress());
    app.use(express.logger('tiny')); /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()),
    //app.use(express.static(path.join(__dirname, '../client')));
});

app.get('/user/add/:username/:domain', data.addUser);
app.get('/user/verified/:username/:domain', data.getUserStatus);
app.get('/domain/data/:domain', data.getDomainData);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});