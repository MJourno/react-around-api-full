const User = require('../models/user');

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
  const { name, about, avatar } = req.body;
  try {
    const newUser = await User
      .create({ name, about, avatar });

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

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
