const bodyParser = require('body-parser');
const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(helmet());
mongoose.connect('mongodb://localhost:27017/aroundb')
  .then(() => {
    console.log('connected to mongoose');
  }).catch(error => {
    console.log('cant connect', error);
  });

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '62914fcaaa09522b2eacbe08',
  };

  next();
});

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

app.get('/', (req, res) => {
  res.send('hello world');
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.get('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`App listen on port ${PORT}...`);
});
