const mongoose = require('mongoose');

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
});
module.exports = mongoose.model('user', userSchema);
