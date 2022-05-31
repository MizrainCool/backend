const mongoose = require('mongoose');
require('dotenv').config();

const conectar = async() =>{

    try{
        await mongoose.connect(process.env.CONEXION);
        console.log('Conectado a la BD');
    }
    catch(error){
        console.log(error);
        throw new Error('Error al intentar conectar');
    }
    
}

module.exports ={
    conectar
}