const express = require('express');

const router = express.Router();
const {
  getCards, createNewCard, deleteCard, likeCard, unLikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createNewCard);
router.delete('/:card_id', deleteCard);
router.put('/:card_id/likes', likeCard);
router.delete('/:card_id/likes', unLikeCard);

module.exports = router;
