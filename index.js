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

app.use(cors());
conectar();

app.get('/', (req, res) =>{
    res.json({
        ok: true,
        msg:'Hola Mundo'
    })
});


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});
