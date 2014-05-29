var express = require('express'),
	path = require('path'),
	http = require('http');
	// data = require('./routes.js');

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
      Math.random() * 9 + 0.5,
      Math.random() * 9 + 0.5,
      ]);
    i++;
  }

  points.push(thisRound);

  // make a copy of this round
  var nextRound = deepCopy(thisRound);

  for (var j = 0; j < rounds - 1; j++) {
    for (var k = 0; k < thisRound.length; k++) {
      for (var z = 0; z < 2; z++) {
        nextRound[k][z] += 4 * Math.random() - 2;
        nextRound[k][z] = Math.min(Math.max(nextRound[k][z], 0.5), 9.5);
      }
    }
    points.push(nextRound);
    nextRound = deepCopy(nextRound);
  }
  return points;
};

var app = express();

app.configure(function () {
	app.set('port', process.env.PORT || 4000);
	app.use(express.compress());
	app.use(express.logger('tiny')); /* 'default', 'short', 'tiny', 'dev' */
	app.use(express.bodyParser()),
	app.use(express.static(path.join(__dirname, '../www')));
});

// app.get('/user/add/:username/:domain', data.addUser);
// app.get('/user/verified/:username/:domain', data.getUserStatus);
// app.get('/domain/data/:domain', data.getDomainData);
app.get('/', function(req, res) {
  res.render('index');
});

app.post('/user/add/:username/:domain', function(req, res) {
  console.log(req.params.username, req.params.domain);
  res.send({success: true});
});

app.post('/user/score/:username/:domain', function(req, res) {
  console.log(req.params.username, req.params.domain);
  res.send({success: true});
});

app.get('/domain/scores/:domain', function(req, res) {
  var points = pointsGenerator(10,10);
  console.log(req.params.domain);
  res.send({points: points});
});


http.createServer(app).listen(app.get('port'), function () {
	console.log("Express server listening on port " + app.get('port'));
});