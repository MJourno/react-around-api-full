const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { ErrorHandler } = require('../errors/error');
const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({})
      .select('+password');
    res.status(200).send(users);
    return users;
  } catch (err) {
    console.log('Error happened in getUsers', err);
    return next(ErrorHandler(500, 'Requested resource not found'));
  }
};

const getUserById = async (req, res, next) => {
  console.log("user id", req.user._id);
  try {
    const user = await User
      .findById(req.user._id)
      .select('+password');
    if (!user) {
      return next(new ErrorHandler(404, 'User ID not found'));
    } else {
      res.status(200).send(user);
      return user;
    }
  } catch (err) {
    console.log('Error happened in getUserById', err);
    if (err.name === 'CastError') {
      return next(new ErrorHandler(400, `${err.name}: NotValid Data`));
    } if (err.name === 'DocumentNotFoundError') {
      return next(new ErrorHandler(404, `${err.name}: User not found`));
    } else {
      return next(new ErrorHandler(500, 'An error has occurred on the server.'));
    }
  }
};
// module.exports.register = (req, res) => {
//   const { email, password } = req.body;
//   bcrypt
//     .hash(password, 10)
//     .then((hash) => User.create({
//       email,
//       password: hash,
//     }))
//     .then((user) => {
//       res.status(201).send({
//         _id: user._id,
//       });
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     });
// };

const createUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    bcrypt
      .hash(password, 10)
      .then((hash) => User.create({ email, password: hash }))
      .then((user) => res.status(201).send({ _id: user._id, email: user.email }))
      .catch((err) => {
        console.log('Error happened in createUser', err);
        if (err.name === 'MongoError') {
          return next(new ErrorHandler(409, `${err.name}: User already taken`));
        } else {
          return next(new ErrorHandler(401, `${err.name}: Email or password are missing`));
        }
      });
  } catch (err) {
    console.log('Error happened in createUser', err);
    if (err.name === 'ValidationError') {
      return next(new ErrorHandler(400, `${err.name}: Something went wrong`));
    } else {
      return next(new ErrorHandler(500, `${err.name}: An error has occurred on the server`));
    }
  }
};

const updateProfile = async (req, res) => {
  const { name, about } = req.body;
  try {
    const newProfile = await User
      .findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
      .select('+password')
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

const updateAvatar = async (req, res) => {
  const { avatar } = req.body;
  try {
    const newAvatar = await User
      .findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
      .select('+password')
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
      const token = jwt.sign({ _id: user._id }, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.header('authorization', `Bearer ${token}`);
      res.status(200).send({ user,token });
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
