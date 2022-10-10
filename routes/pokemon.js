const express = require('express');
const router = express.Router();

const {
    removeFromCart,
    getCart,
    addToCart,
    clearCart,
} = require('../controllers/pokemonController.js');

router.route('/cart').get(getCart).post(addToCart).delete(clearCart);
router.route('/cart/:id').delete(removeFromCart)

module.exports = router;
