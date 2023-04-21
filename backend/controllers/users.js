const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { ErrorHandler } = require('../errors/error');
const { NODE_ENV } = require('../utils/constans');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({})
    res.status(200).send(users);
    return users;
  } catch (err) {
    console.log('Error happened in getUsers', err);
    return next(ErrorHandler(500, 'Requested resource not found'));
  }
};

const getUserById = async (req, res, next) => {
  console.log(typeof (req.user._id));
  try {
    const user = await User.findById(req.user._id)
    if (!user) {
      return next(new ErrorHandler(404, 'User ID not found'));
    }
    res.status(200).send(user);
  } catch (err) {
    console.log('Error happened in getUserById', err);
    if (err.name === 'CastError') {
    } if (err.name === 'DocumentNotFoundError') {
    }
    return next(new ErrorHandler(500, 'An error has occurred on the server.'));
  }
};

const createUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email && !password) {
      return next(new ErrorHandler(400, `email and password reqwired`));
    }
    const isUserExists = await User.findOne({ email });
    if (isUserExists) {
      return next(new ErrorHandler(409, `email already exists`));
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword })
    if (hashedPassword && user) {
      res.status(201).send({ id: user._id, email: user.email });
    }
  } catch (err) {
    console.log('Error happened in createUser', err);
    if (err.name === 'ValidationError') {
      return next(new ErrorHandler(400, `${err.name}: Something went wrong`));
    } else {
      return next(new ErrorHandler(500, `${err.name}: An error has occurred on the server`));
    }
  }
};

const updateProfile = async (req, res, next) => {
  const { name, about } = req.body;
  try {
    const newProfile = await User
      .findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
      .orFail();
    res.send(newProfile);
    return newProfile;
  } catch (err) {
    console.log('Error happened in updateProfile', err);
    if (err.name === 'ValidationError') {
      return next(new ErrorHandler(400, `${err.name}: Not a valid user profile`));
    } else {
      return next(new ErrorHandler(500, 'Something went wrong'));
    }
  }
};

const updateAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  try {
    const newAvatar = await User
      .findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
      .orFail();
    res.send(newAvatar);
    return newAvatar;
  } catch (err) {
    console.log('Error happened in updateAvatar', err);
    if (err.name === 'ValidationError') {
      return next(new ErrorHandler(400, `${err.name}: Not a valid user avatar`));
    } else {
      return next(new ErrorHandler(500, 'Something went wrong'));
    }
  }
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.status(200).send({ token });
    })
    .catch((err) => {
      console.log('Error happened in login', err);
      return next(new ErrorHandler(401, 'Something went wrong'));
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
  login,
};