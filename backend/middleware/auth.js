const jwt = require('jsonwebtoken');
const { ErrorHandler } = require('../errors/error');
const { JWT_SECRET } = process.env;
require('dotenv').config();
const { NODE_ENV } = require('../utils/constans');

module.exports = (req, res, next) => {
  // getting authorization from the header
  const { authorization } = req.headers;
  // check the header exists and starts with 'Bearer '
  if (!authorization || !authorization.startsWith('Bearer ')) {
    console.log(authorization, "authorization2");
    return next(new ErrorHandler(401, 'Authorization Error'));
  }
  // getting the token
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    // verifying the token
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    if (payload) {
      req.user = payload;
    } else {
      return next(new ErrorHandler(401, 'Authorization Error'));
    }
  } catch (err) {
    console.log('Error happened in auth', err);
    // we return an error if something goes wrong
    // return handleAuthError(res);
    return next(new ErrorHandler(401, 'Authorization Error'));
  }
  // assigning the payload to the request object
  // sending the request to the next middleware
  next();
};