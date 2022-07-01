const Card = require('../models/card');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});

    res.send(cards);
  } catch (error) {
    console.log('Error happened in getCards', error);
    res.status(500).send({ message: 'Something went wrong' });
  }
};

const createNewCard = async (req, res) => {
  console.log(req.user._id);
  const { name, link } = req.body;
  try {
    const newCard = await Card.create({ name: name, link: link, owner: req.user._id });

    res.send(newCard);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Not a valid user id' });
    } else {
      res.status(500).send({ message: 'Something went wrong' });
    }
  }
};

const deleteCard = async (req, res) => {
  console.log(req.params);
  try {
    const cardById = await Card.findByIdAndRemove(req.params.card_id);
    if (cardById) {
      res.send(cardById);
    } else {
      res.status(404).send({ message: 'Card ID not found' });
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Not a valid user id' });
    } else {
      res.status(500).send({ message: 'Something went wrong' });
    }
  }
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.card_id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then(card => res.send({ data: card }))
    .catch(err => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'NotValid Data' });
      } if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'User not found' });
      } else {
        res.status(500).send({ message: 'An error has occurred on the server' });
      }
    });
};

const unLikeCard = async (req, res) => {
  Card.findByIdAndUpdate(
    req.params.card_id,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
  )
    .then(card => res.send({ data: card }))
    .catch(err => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'NotValid Data' });
      } if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'User not found' });
      } else {
        res.status(500).send({ message: 'An error has occurred on the server' });
      }
    });
};

module.exports = {
  getCards,
  createNewCard,
  deleteCard,
  likeCard,
  unLikeCard,
};
