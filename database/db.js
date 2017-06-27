const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const connection = mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost/users`);

const UserSchema = new Schema({
  id: String,
  name: String,
  photo_url: String,
  default_address: String,
  friends: Array,
  suggestions: Array,
}); 

const User = mongoose.model('User', UserSchema);
module.exports = User;