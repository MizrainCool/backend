const {Router} = require('express')
const {check} = require('express-validator')

//const { getcampeones, crearcampeon, actualizarcampeon, borrarcampeon} = require_('')



const {
    obtenerRegiones,
    obtenerRegion,
    crearregiones,
    actualizarregiones,
    borrarregiones
} = require('../controllers/regiones')

const router = Router()

// Obtener regiones
router.get('/', obtenerRegiones)

router.get('/:id', obtenerRegion)

// Crear Regiones
router.post('/',
[
    check('nombre', 'El nombre de la region es necesario').not().isEmpty(),
    check('geografia', 'La geografia es requerida').not().isEmpty()
],
crearregiones
)

router.put('/:id',
[
    check('nombre', 'El nombre de la region es necesario').not().isEmpty(),
    check('geografia', 'La geografia es requerida').not().isEmpty()
],
actualizarregiones
)

router.delete('/:id',
borrarregiones
)

module.exports = router;