const mongoose = require('mongoose');

const userSchema = new mongoose.schema ({
    username: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
  