// const fetch = require('node-fetch');

// fetch('https://ubahthebuilder.tech/posts/1')
// .then(data => {
// return data.json();
// })
// .then(post => {
// console.log(post.title);
// });
const express = require('express');
const cors = require('cors');
require('dotenv').config();
//console.log(process.env);
const { conectar } = require('./base_de_datos/configuracion');  

const app = express();
app.use(express.json());
app.use(cors());
conectar();

app.use('/api/campeones', require('./routes/campeones'));
app.use('/api/regiones', require('./routes/regiones'));

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});

