const bodyParser = require('body-parser');
const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middleware/auth');
const { ErrorHandler, customErrorHandler } = require('./errors/error');
const { requestLogger, errorLogger } = require('./middleware/logger');

require('dotenv').config();

console.log(process.env.NODE_ENV); // production

const app = express();
const { PORT = 3000 } = process.env;

const allowedOrigins = [
  'https://project15.strangled.net',
  'https://www.project15.strangled.net',
  'https://api.project15.strangled.net',
  'http://localhost:3000',
];

mongoose.connect('mongodb://localhost:27017/aroundb')
  .then(() => {
    console.log('connected to mongoose');
  }).catch(error => {
    console.log('cant connect', error);
  });

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.options(allowedOrigins, cors());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

// app.use((req, res, next) => {
//   req.user = {
//     _id: '62914fcaaa09522b2eacbe08',
//   };

//   next();
// });

app.get('/', (req, res) => {
  res.send('hello world');
});

app.post('/signin', login);
app.post('/signup', createUser);
// authorization
app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(errorLogger); // enabling the error logger
app.use(errors()); // celebrate error handler
app.use(() => {
  throw new ErrorHandler(404, 'The requested resource was not found.');
});
app.use((err, req, res, next) => {
  // this is the error handler
  customErrorHandler(err, res);
});

app.listen(PORT, () => {
  console.log(`App listen on port ${PORT}...`);
});
