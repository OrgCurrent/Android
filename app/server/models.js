var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var voteSchema = new Schema({
  individual: Number,
  organization: Number,
  version: String,
  created: { type: Date, default: Date.now }
});

var userSchema = new Schema({
  username: String,
  email: String,
  votes: [voteSchema],
  created: { type: Date, default: Date.now }
});

var domainSchema = new Schema({
  name: String,
  users: [userSchema],
  created: { type: Date, default: Date.now }
});