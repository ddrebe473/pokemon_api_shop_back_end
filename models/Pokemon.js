const mongoose = require('mongoose');

const PokemonSchema = new mongoose.Schema({
   pokemon: mongoose.Schema.Types.Mixed
});

module.exports = mongoose.model('Pokemon', PokemonSchema);
// model.find({completed:true})