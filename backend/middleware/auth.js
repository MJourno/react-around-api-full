const jwt = require('jsonwebtoken');

const handleAuthError = (res) => {
   res
    .status(401)
    .send({ "message": "Authorization Error" });
};

const extractBearerToken = (header) => {
    return header.replace('Bearer ', '');
};

module.exports = (req, res, next) => {
// getting authorization from the header
  const { authorization } = req.headers;
// check the header exists and starts with 'Bearer '
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }
// getting the token
  const token = extractBearerToken(authorization);
  let payload;
  try {
// verifying the token
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
// we return an error if something goes wrong
    return handleAuthError(res);
  }
// assigning the payload to the request object
  req.user = payload;
// sending the request to the next middleware
  next();
};