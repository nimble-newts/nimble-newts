const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const connection = mongoose.connect(`mongodb://localhost/users`);

const UserSchema = new Schema({
  default_address: String,
  friends: Array,
  suggestions: Array,
  access_token: String,
  salt: String
}); 

const User = mongoose.model('User', UserSchema);
exports.User = User;