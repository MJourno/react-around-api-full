const bodyParser = require('body-parser');
const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middleware/auth');

// NODE_ENV=production
// JWT_SECRET=eb28135ebcfc17578f96d4d65b6c7871f2c803be4180c165061d5c2db621c51b

// require('dotenv').config();

const app = express();
app.use(helmet());
mongoose.connect('mongodb://localhost:27017/aroundb')
  .then(() => {
    console.log('connected to mongoose');
  }).catch(error => {
    console.log('cant connect', error);
  });

app.use(bodyParser.json());

// app.use((req, res, next) => {
//   req.user = {
//     _id: '62914fcaaa09522b2eacbe08',
//   };

//   next();
// });

const { PORT = 3000 } = process.env;

app.get('/', (req, res) => {
  res.send('hello world');
});

app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);

app.post('/signin', login);
app.post('/signup', createUser);


app.get('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`App listen on port ${PORT}...`);
});
