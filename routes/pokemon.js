const express = require('express');
const router = express.Router();

const {
    removeFromCart,
    getCart,
    addToCart,
    clearCart,
} = require('../controllers/cartController.js');

const{ 
    getTypes,
    getPokeByType
} = require('../controllers/pokemonController')

router.route('/cart').get(getCart).post(addToCart).delete(clearCart);
router.route('/cart/:id').delete(removeFromCart)

router.route('/types').get(getTypes)
router.route('/types/:type').get(getPokeByType)

module.exports = router;
