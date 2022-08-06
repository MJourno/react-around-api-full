const bodyParser = require('body-parser');
const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middleware/auth');
const { ErrorHandler, customErrorHandler } = require('./errors/error');
const { requestLogger, errorLogger } = require('./middleware/logger');

// NODE_ENV=production
// JWT_SECRET=eb28135ebcfc17578f96d4d65b6c7871f2c803be4180c165061d5c2db621c51b

// require('dotenv').config();

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/aroundb')
  .then(() => {
    console.log('connected to mongoose');
  }).catch(error => {
    console.log('cant connect', error);
  });

app.use(helmet());
app.use(bodyParser.json());
app.use(requestLogger);

// app.use((req, res, next) => {
//   req.user = {
//     _id: '62914fcaaa09522b2eacbe08',
//   };

//   next();
// });


app.get('/', (req, res) => {
  res.send('hello world');
});

app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);

app.post('/signin', login);
app.post('/signup', createUser);

app.use(errorLogger); // enabling the error logger
app.use(errors()); // celebrate error handler

app.use((err, req, res, next) => {
  // this is the error handler
  customErrorHandler(err, res);
});

app.listen(PORT, () => {
  console.log(`App listen on port ${PORT}...`);
});
