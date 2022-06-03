const { response } = require('express');
const { validationResult } = require('express-validator')
const Campeon = require('../models/campeones');
const mongoose = require ('mongoose');
const Region = require('../models/regiones')

const getcampeones = async (req, res = response)=>{
    const campeones = await Campeon.find(   ).populate('region', 'nombre geografia')
    return res.json({
        ok: true,
        campeones
    })
}
// Esta funciion sirve para obtener UN SOLO campeon
const getcampeon = async (req, res = response) =>{
    const campeonId = req.params.id
    if(!mongoose.Types.ObjectId.isValid(campeonId))
    {
      return res.status(404).json({
        ok: false,
        msg: 'El ID del campeon no es valido',
      });
    }
    const campeon = await Campeon.findById(campeonId)
    if (!campeon) {
        return res.json({
            ok: true,
            msg: 'El campeon no existe'
        })
    }
    return res.json({
        ok: true,
        campeon
    })
}

const crearCampeon = async (req, res=response)=>{
    
    const { nombre, region, linea, habilidad } = req.body

    const errores = validationResult( req )
    if( !errores.isEmpty()){
        return res.status(400).json({
            ok: false,
            msg: 'El dato no es valido',
            errores: errores.mapped()
        })
    }

    if(!mongoose.Types.ObjectId.isValid(region))
    {
      return res.status(404).json({
        ok: false,
        msg: 'El ID de la region no es valido',
      });
    }

    const nombreExiste = await Campeon.findOne({nombre})
    if (nombreExiste) {
        return res.json({
            ok: true,
            msg:'El nombre del ' + nombre + ' campeon ya existe'
        })
    }

    const regionExiste = await Region.findById(region)
    console.log(regionExiste)
    if (!regionExiste) {
        return res.json({
            ok: true,
            msg:'La region no existe'
        })
    }

    const crearCampeon = new Campeon(req.body)
    crearCampeon.save()
    return res.json({
        ok: true,
        msg:'Campeon creado correctamente',
        crearCampeon
    })
}

const actualizarcampeones = async (req, res)=>{
    const campeonId = req.params.id
    const { nombre, habilidad, linea, region } = req.body
    const errores = validationResult( req )
    if( !errores.isEmpty()){
        return res.status(400).json({
            ok: false,
            msg: 'El dato no es valido',
            errores: errores.mapped()
        })
    }
    if (!mongoose.Types.ObjectId.isValid(campeonId))
    {
      return res.status(404).json({
        ok: false,
        msg: 'El ID del campeon no es valido',
      });
    }

    const existeCampeon= await Campeon.findById(campeonId)
    console.log(existeCampeon.nombre !== nombre)

    if(existeCampeon.nombre !== nombre){
        const nombreExiste = await Campeon.findOne({nombre})
        if(nombreExiste){
            return res.json({
                ok: false,
                msg: 'El nombre del campeon ya existe'
            })
        } 
    }
    
    existeCampeon.nombre = nombre
    existeCampeon.habilidad = habilidad
    existeCampeon.linea = linea
    existeCampeon.region = region 
    const campeon = await Campeon.findByIdAndUpdate(campeonId, existeCampeon, {new: true})

    return res.json({
        ok: true,
        msg:'Campeon actualizado',
        campeon
    })
}

const borrarcampeones = async (req, res)=>{
    const campeonId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(campeonId))
    {
      return res.status(404).json({
        ok: false,
        msg: 'El ID del campeon no es valido',
      });
    }

    const campeonExiste = await Campeon.findById(campeonId)

    if (!campeonExiste) {
        return res.json({
            ok: true,
            msg: 'El campeon no existe'
        })
    }

    const campeon = await Campeon.findByIdAndDelete(campeonId)

    return res.json({
        ok: true,
        msg:'El campeon '+ campeon.nombre + ' se ha borrado'
    })
}

module.exports ={
    getcampeon,
    getcampeones,
    crearCampeon,
    actualizarcampeones,
    borrarcampeones
}