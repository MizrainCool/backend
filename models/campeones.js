const { Schema, model} = require('mongoose');

const campeon = Schema({
    nombre:{
        type: String,
        required: true,
        unique: true
    },
    habilidad:{
        type: String,
        required: true
    },
    linea:{
        type: String,
        required: true
    },
    region:{
        type: Schema.Types.ObjectId,
        ref: 'Region'
    }

})

module.exports = model('Campeon', campeon);