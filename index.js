const dotEnv = require('dotenv');
dotEnv.config();
const cors = require('cors')
const express = require('express');

const app = express();
const port = 8000;
const connectDb = require('./db/connect');

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello pokemon');
});

const pokemonRoutes = require('./routes/pokemon');

app.use('/api/pokemon', pokemonRoutes);
//server
app.listen(port, () => {
    console.log(`listening on ${port}`);
    connectDb(process.env.MONGO_URI);
});
