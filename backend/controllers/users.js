const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.send(users);
  } catch (error) {
    console.log('Error happened in getUsers', error);
    res.status(500).send({ message: 'Requested resource not found' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User
      .findById(req.params.user_id);
    if (!user) {
      res.status(404).send({ message: 'User ID not found' });
    } else {
      res.send(user);
    }
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'NotValid Data' });
    } if (err.name === 'DocumentNotFoundError') {
      res.status(404).send({ message: 'User not found' });
    } else {
      res.status(500).send({ message: 'An error has occurred on the server' });
    }
  }
};

const createUser = async (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  try {
    // bcrypt.hash({password},10);
    const salt = bcrypt.genSalt(10);
    const hash = bcrypt.hash({ password }, salt);
    const newUser = await User
      .create({ name, about, avatar, email, password: hash });

    res.send(newUser);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Not a valid user' });
    } else {
      res.status(500).send({ message: 'Something went wrong' });
    }
  }
};

const updateProfile = async (req, res) => {
  const { name, about } = req.body;
  try {
    const newProfile = await User
      .findByIdAndUpdate({ name, about }, { new: true, runValidators: true })
      .orFail();

    res.send(newProfile);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Not a valid user profile' });
    } else {
      res.status(500).send({ message: 'Something went wrong' });
    }
  }
};

const updateAvatar = async (req, res) => {
  const { avatar } = req.body;
  try {
    const newAvatar = await User
      .findByIdAndUpdate({ avatar }, { new: true, runValidators: true })
      .orFail();

    res.send(newAvatar);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Not a valid user avatar' });
    } else {
      res.status(500).send({ message: 'Something went wrong' });
    }
  }
};

const login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .select('+password')
    .then((user) => {
      const token = jwt.sign({ _id: user_id }, 'some-secret-key');
      res.send({ token: jwt.sign({ _id: user_id }, 'super-strong-secret', { expiresIn: '7d' }) });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
  login,
};
