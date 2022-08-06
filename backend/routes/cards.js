const express = require('express');
const { celebrate, Joi } = require('celebrate');
const router = express.Router();
const {
  getCards, createNewCard, deleteCard, likeCard, unLikeCard,
} = require('../controllers/cards');
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
}

router.get('/', getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30),
    link: Joi.string().required().custom(validateURL),
  }),
}), createNewCard);
router.delete('/:card_id', celebrate({
  params: Joi.object().keys({
    card_id: Joi.string().hex().length(24),
  }),
}), deleteCard);
router.put('/:card_id/likes', celebrate({
  params: Joi.object().keys({
    card_id: Joi.string().hex().length(24),
  }),
}), likeCard);
router.delete('/:card_id/likes', celebrate({
  params: Joi.object().keys({
    card_id: Joi.string().hex().length(24),
  }),
}), unLikeCard);

module.exports = router;
