var express = require('express');
var path = require('path');
var http = require('http');

var deepCopy = function(nest) {
  var result = [];
  for (var i = 0; i < nest.length; i++) {
    result.push(nest[i].slice());
  }
  return result;
}

var pointsGenerator = function(num, rounds) {
  var points = [];
  thisRound = [];
  var i = 0;

  while (i < num) {
    thisRound.push([
      Math.random() * 90 + 5,
      Math.random() * 90 + 5,
      ]);
    i++;
  }

  points.push(thisRound);

  // make a copy of this round
  var nextRound = deepCopy(thisRound);

  for (var j = 0; j < rounds - 1; j++) {
    for (var k = 0; k < thisRound.length; k++) {
      for (var z = 0; z < 2; z++) {
        nextRound[k][z] += 40 * Math.random() - 20;
        nextRound[k][z] = Math.min(Math.max(nextRound[k][z], 5), 95);
      }
    }
    points.push(nextRound);
    nextRound = deepCopy(nextRound);
  }
  return points;
};

// var userInfo = {
//   username: 'andrew',
//   domain: 'spacewalking.com'
// };

var userInfo = 0;


var app = express();

app.configure(function () {
	app.set('port', process.env.PORT || 4000);
	app.use(express.compress());
	app.use(express.logger('tiny')); /* 'default', 'short', 'tiny', 'dev' */
	app.use(express.bodyParser()),
	app.use(express.static(path.join(__dirname, '../www')));
});

app.get('/userInfo', function(req, res) {
  if (userInfo) {
    res.send(200, userInfo);
  } else {
    res.send(404);
  }
});

app.post('/userInfo', function(req, res) {
  console.log(req.body);
  userInfo = {username: req.body.username, domain: req.body.domain};
  res.send(200);
});


app.post('/user/add/:username/:domain', function(req, res) {
  console.log(req.params.username, req.params.domain);
  res.send({success: true});
});

app.get('/dummyData/send', function(req, res) {
  res.send({success: true});
});

app.get('/dummyData', function(req, res) {
  var points = pointsGenerator(10,10);
  console.log(req.params.domain);
  res.send({points: points});
});


app.get('/', function(req, res) {
  res.render('index');
});

http.createServer(app).listen(app.get('port'), function () {
  console.log("Express server listening on port " + app.get('port'));
});