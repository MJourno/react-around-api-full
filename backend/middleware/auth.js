const jwt = require('jsonwebtoken');
const { Console } = require('winston/lib/winston/transports');
const { ErrorHandler } = require('../errors/error');
const { NODE_ENV, JWT_SECRET } = process.env;
require('dotenv').config();


module.exports = (req, res, next) => {
// getting authorization from the header
  const { authorization } = req.headers;
  console.log(process.env.NODE_ENV,"process.env");
  console.log(process.env.JWT_SECRET,"jwt");
  console.log(authorization,"authorization1");
// check the header exists and starts with 'Bearer '
  if (!authorization || !authorization.startsWith('Bearer ')) {
    console.log(authorization,"authorization2");
    return next(new ErrorHandler(403, 'Authorization Error'));
  }
// getting the token
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
// verifying the token
    payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret');
  } catch (err) {
    console.log('Error happened in auth', err);
// we return an error if something goes wrong
    // return handleAuthError(res);
    return next(new ErrorHandler(401, 'Authorization Error'));
  }
// assigning the payload to the request object
  req.user = payload;
// sending the request to the next middleware
  next();
  return req.user;
};