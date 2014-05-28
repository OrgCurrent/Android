var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

mongoose.connect('mongodb://localhost');

var scoreSchema = new Schema({
  scoreX: Number,
  scoreY: Number,
  version: String,
  created: { type: Date, default: Date.now }
});

var userSchema = new Schema({
  username: String,
  userdomain: String,
  code: String,
  verified: {type: Boolean, default: false},
  scores: [scoreSchema],
  updated: { type: Date, default: Date.now },
  created: { type: Date, default: Date.now }
});

var domainSchema = new Schema({
  name: String,
  users: [userSchema],
  created: { type: Date, default: Date.now }
});

domainSchema.methods.getUserCount = function () {
  var validUser = function (user) { return user.verified === true };
  return this.users.filter(validUser).length;
}

domainSchema.methods.getUsers = function () {
  var validUser = function (user) { return user.verified === true };
  return this.users.filter(validUser);
}

domainSchema.methods.getScores = function () {
  var getLatestScore = function (scores) { return scores.pop() };
  return this.getUsers.map(getLatestScore)
}

exports.Score  = mongoose.model('Score', scoreSchema);
exports.User   = mongoose.model('User', userSchema);
exports.Domain = mongoose.model('Domain', domainSchema);











