const Pokemon = require('../models/Pokemon');

const clearCart = async (req, res) => {
    const deleteRes = await Pokemon.deleteMany({});
    res.status(200).json(deleteRes);
};

const getCart = async (req, res) => {
    console.log('in getCart');

    const pokemonList = await Pokemon.find({});
    console.log('pokemonList', pokemonList);
    res.status(200).json(pokemonList);
};

const removeFromCart = async (req, res) => {
    const { id } = req.params;
    const pokemon = await Pokemon.findOne({ 'pokemon.id': Number(id) });
    if (pokemon) {
        await pokemon.delete();
        res.status(200).json(true);
    } else {
        res.status(200).json(false);
    }
};

const addToCart = async (req, res) => {
    const { pokemon } = req.body;
    const createRes = await Pokemon.create({ pokemon });
    res.status(200).json(createRes);
};

module.exports = {
    getCart,
    removeFromCart,
    addToCart,
    clearCart,
};
