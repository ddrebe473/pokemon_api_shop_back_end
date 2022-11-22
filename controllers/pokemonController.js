const { default: axios } = require('axios');

const POKEMON_API_URL = 'https://pokeapi.co/api/v2/';

const TYPE_IMAGE_BASE_URL =
    'https://www.serebii.net/newpokemonsnap/stickers/type';

const INCLUDE_LIST = [
    'grass',
    'fire',
    'water',
    'normal',
    'electric',
    'ground',
    'steel',
    'psychic',
    'fairy',
    'ghost',
    'dark',
    'ice',
    'rock',
    'dragon',
    'flying',
    'fighting',
    'poison',
    'bug',
];

const getTypes = async (req, res) => {
    
    const typesRes = await axios(`${POKEMON_API_URL}type`);
    
    let types = typesRes.data
    types = types.results;

    types = types.filter((type) => INCLUDE_LIST.includes(type.name));

    //add image to each type
    types = types.map((type) => {
        type.image = `${TYPE_IMAGE_BASE_URL}${type.name}.png`;
        return type;
    });
    
    res.status(200).json(types); 
};

const calcPrice = (pokemon) => {
    return pokemon.base_experience / 5;
};


const getPokeByType = async (req, res) => {
    
    const { type } = req.params;

    let typeRes = await axios(`${POKEMON_API_URL}type/${type}`);
    typeRes = typeRes.data;
    pokemonList = typeRes.pokemon;

    //temp shorten the list
    pokemonList = pokemonList.slice(0, 10);

    let pokemonDataList = [];

    //get the pokemon data for each pokemon
    for (let i = 0; i < pokemonList.length; i++) {
        const pokemon = pokemonList[i];
        let pokemonRes = await axios(pokemon.pokemon.url);
        pokemonRes = pokemonRes.data;
        pokemonRes.price = calcPrice(pokemonRes);
        pokemonDataList.push(pokemonRes);
    }

res.status(200).json(pokemonDataList);
};

module.exports = {
    getTypes,
    getPokeByType
};
