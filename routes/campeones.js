const {Router} = require('express')
const {check} = require('express-validator')
//const { getcampeones, crearcampeon, actualizarcampeon, borrarcampeon} = require_('')


const {
    getcampeones,
    crearCampeon,
    actualizarcampeones,
    borrarcampeones,
    getcampeon
} = require('../controllers/campeones')

const router = Router()

router.get('/', getcampeones)

router.get('/:id', getcampeon, [])

router.post('/',
[
    check('nombre', 'El nombre del campeon es necesario').not().isEmpty(),
    check('habilidad', ' Escribe una habilidad').not().isEmpty(),
    check('linea', ' Asigna una linea').not().isEmpty()
],
crearCampeon
)

router.put('/:id',
[
    check('nombre', 'El nombre del campeon es necesario').not().isEmpty(),
    check('habilidad', ' Escribe una habilidad').not().isEmpty(),
    check('linea', ' Asigna una linea').not().isEmpty()
],
actualizarcampeones
)

router.delete('/:id',
borrarcampeones, []
)

module.exports = router;