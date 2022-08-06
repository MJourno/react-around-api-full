const jwt = require('jsonwebtoken');
const { ErrorHandler } = require('../errors/error');

module.exports = (req, res, next) => {
// getting authorization from the header
  const { authorization } = req.headers;
// check the header exists and starts with 'Bearer '
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(ErrorHandler(403, 'Authorization Error'));
  }
// getting the token
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
// verifying the token
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
// we return an error if something goes wrong
    // return handleAuthError(res);
    return next(ErrorHandler(401, 'Authorization Error'));
  }
// assigning the payload to the request object
  req.user = payload;
// sending the request to the next middleware
  next();
  return req.user;
};