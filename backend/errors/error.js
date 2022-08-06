class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleErrors = (err, res) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};

const handleServerError = (err, res) => {
  res.status(500).json({
    error: { message: `Somthing went wrong ${err}.` },
  });
};

const customErrorHandler = (err, res) => {
  err instanceof ErrorHandler
    ? handleErrors(err, res)
    : handleServerError(err, res);
};

module.exports = {
  ErrorHandler,
  customErrorHandler,
};
