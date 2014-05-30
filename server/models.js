var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

mongoose.connect('http://graphs.delimited.io/domain/data/spacewalking.com');

var scoreSchema = new Schema({
  x: Number,
  y: Number,
  version: String,
  created: { type: Date, default: Date.now }
});

var userSchema = new Schema({
  username: String,
  userdomain: String,
  code: String,
  verified: { type: Boolean, default: false },
  scores: [scoreSchema],
  created: { type: Date, default: Date.now }
});

exports.Score  = mongoose.model('Score', scoreSchema);
exports.User   = mongoose.model('User', userSchema);











