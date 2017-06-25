var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var connection = mongoose.connect(`mongodb://localhost/users`);

var UserSchema = new Schema({
  userName: String,
  defaultAddress: String,
  friends: Array,
  suggestions: Array,
  accessToken: String,
  salt: String
}); 

var User = mongoose.model('User', UserSchema);
exports.User = User;