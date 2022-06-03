const { Schema, model} = require('mongoose');

const region = Schema({
    nombre:{
        type: String,
        required: true,
        unique: true
    },
    geografia:{
        type: String,
        required: true
    }
})


module.exports = model('Region', region);