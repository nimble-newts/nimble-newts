var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var port = 27017;
var connection = mongoose.connect(`mongodb://localhost:${port}/users`);

var UserSchema = new Schema({
  _id: Number,
  default_address: String,
  friends: Array,
  suggestions: Array,
  access_token: String,
  salt: String
}); 

var User = mongoose.model('User', UserSchema);
exports.User = User;