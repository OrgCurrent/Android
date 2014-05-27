var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost');

var scoreSchema = new Schema({
  scoreX: Number,
  scoreY: Number,
  version: String,
  created: { type: Date, default: Date.now }
});

var userSchema = new Schema({
  username: String,
  email: String,
  code: String,
  verified: {type: Boolean, default: false},
  votes: [scoreSchema],
  created: { type: Date, default: Date.now }
});

var domainSchema = new Schema({
  name: String,
  users: [userSchema],
  created: { type: Date, default: Date.now }
});

exports.Score  = mongoose.model('Score', scoreSchema);
exports.User   = mongoose.model('User', userSchema);
exports.Domain = mongoose.model('Domain', domainSchema);











