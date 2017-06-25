var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var connection = mongoose.connect(`mongodb://localhost/users`);

var UserSchema = new Schema({
  default_address: String,
  friends: Array,
  suggestions: Array,
  access_token: String,
  salt: String
}); 

var User = mongoose.model('User', UserSchema);
exports.User = User;