const Card = require('../models/card');
const { ErrorHandler } = require('../errors/error');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.status(200).send(cards);
    return cards;
  } catch (err) {
    console.log('Error happened in getCards', err);
    return next(new ErrorHandler(500, 'Something went wrong'));
  }
};

const createNewCard = async (req, res, next) => {
  const { name, link } = req.body;
  try {
    const newCard = await Card.create({
      name: name,
      link: link,
      owner: req.user._id
    }
    );
    res.status(201).send(newCard);
    return newCard;
  } catch (err) {
    console.log('Error happened in createNewCard', err);
    if (err.name === 'ValidationError') {
      return next(new ErrorHandler(400, `${err.name}: Not a valid user id`));
    } else {
      return next(new ErrorHandler(500, `${err.name}: Something went wrong`));
    }
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const cardById = await Card.findByIdAndRemove(req.params.card_id);
    if (cardById) {
      res.send(cardById);
    } else {
      return next(new ErrorHandler(404, 'Card ID not found'));
    }
  } catch (err) {
    console.log('Error happened in deleteCard', err);
    if (err.name === 'ValidationError') {
      return next(new ErrorHandler(400, `${err.name}: Not a valid user id`));
    } else {
      return next(new ErrorHandler(500, `${err.name}: Something went wrong`));
    }
  }
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.card_id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then(card => res.send({ data: card }))
    .catch(err => {
      console.log('Error happened in likeCard', err);
      if (err.name === 'CastError') {
        return next(new ErrorHandler(400, `${err.name}: NotValid Data`));
      } if (err.name === 'DocumentNotFoundError') {
        return next(new ErrorHandler(404, `${err.name}: User not found`));
      } else {
        return next(new ErrorHandler(500, `${err.name}: An error has occurred on the server`));
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
      console.log('Error happened in unlikeCard', err);
      if (err.name === 'CastError') {
        return next(new ErrorHandler(400, `${err.name}: NotValid Data`));
      } if (err.name === 'DocumentNotFoundError') {
        return next(new ErrorHandler(404, `${err.name}: User not found`));
      } else {
        return next(new ErrorHandler(500, `${err.name}: An error has occurred on the server`));
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
