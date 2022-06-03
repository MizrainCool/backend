const { response } = require('express')
const Region = require('../models/regiones')
const Campeon = require('../models/campeones')
const { validationResult } = require('express-validator')
const mongoose = require ('mongoose');


const obtenerRegiones = async (req, res=response)=>{
    const regiones = await Region.find()
    return res.json({
        ok: true,
        regiones
    })
}

const obtenerRegion = async (req, res = response) => {
    const regionId = req.params.id
    if(!mongoose.Types.ObjectId.isValid(regionId))
    {
      return res.status(404).json({
        ok: false,
        msg: 'El ID de la region no es valido',
      });
    }
    const region = await Region.findById(regionId)
    if (!region) {
        return res.json({
            ok: true,
            msg: 'La region no existe'
        })
    }
    return res.json({
        ok: true,
        region
    })
}

const crearregiones = async (req, res=response)=>{
    const {nombre } = req.body
    const errores = validationResult( req )
    if( !errores.isEmpty()){
        return res.status(400).json({
            ok: false,
            msg: 'El dato no es valido',
            errores: errores.mapped()
        })
    }

    const nombreExiste = await Region.findOne({nombre})
    if(nombreExiste){
        return res.json({
            ok: true,
            msg:'El nombre '+ nombre + ' ya existe'
        })
    }
    const crearRegion = new Region(req.body)
    crearRegion.save()
    return res.json({
        ok: true,
        msg:'Region creada correctamente',
        crearRegion
    })
}

const actualizarregiones = async (req, res)=>{
    const regionId = req.params.id
    const { nombre, geografia } = req.body
    const errores = validationResult( req )
    if( !errores.isEmpty()){
        return res.status(400).json({
            ok: false,
            msg: 'El dato no es valido',
            errores: errores.mapped()
        })
    }
    if (!mongoose.Types.ObjectId.isValid(regionId))
    {
      return res.status(404).json({
        ok: false,
        msg: 'El ID de la region no es valido',
      });
    }

    const regionExiste = await Region.findById(regionId)
    console.log(regionExiste.nombre !== nombre)

    if (regionExiste.nombre !== nombre) {
        const nombreExiste = await Region.findOne({nombre})
        if(nombreExiste){
            return res.json({
                ok: true,
                msg:'El nombre '+ nombre + ' ya existe'
            })
        }
    }

    regionExiste.nombre = nombre
    regionExiste.geografia = geografia
    const region = await Region.findByIdAndUpdate(regionId, regionExiste, {new: true})

    return res.json({
        ok: true,
        msg:'Region Actualizado',
        region
    })
}

const borrarregiones = async (req, res)=>{
    const regionId = req.params.id    
    if (!mongoose.Types.ObjectId.isValid(regionId))
    {
      return res.status(404).json({
        ok: false,
        msg: 'El ID de la region no es valido',
      });
    }
    const regionExisteEnCampeones = await Campeon.findOne({region: regionId})
    if (regionExisteEnCampeones) {
        return res.json({
            ok: true,
            msg: 'No se puede borrar por que ya esta relacionado'
        })
    }
    const regionExiste = await Region.findById(regionId)
    if (!regionExiste) {
        return res.json({
            ok: true,
            msg: 'La region no existe'
        })
    }
    const region = await Region.findByIdAndDelete(regionId)
    return res.json({
        ok: true,
        msg: `La region: ${region.nombre} se borro`
    })
}

module.exports ={
    obtenerRegion,
    obtenerRegiones,
    crearregiones,
    actualizarregiones,
    borrarregiones
}