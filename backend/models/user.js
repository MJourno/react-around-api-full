const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /https?:\/\/(www\.)?\S+(\.\w+)+(\/\w*)*\/*/i.test(value);
      },
      message: [true, 'Url required'],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'invalid Email address',
    }
  },
  password: {
    type: String,
    required:true,

  },
});
module.exports = mongoose.model('user', userSchema);
