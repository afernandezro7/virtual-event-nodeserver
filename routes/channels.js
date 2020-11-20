/****************************************
*          [CHANNEL] ROUTES             *
*         host + /api/channels          *
*---------------------------------------*  
*    CREATE CHANNEL: post    '/create'  *
*      LIST CHANNEL: get     '/'        *
*    DELETE CHANNEL: delete  '/:id'     *
*    UPDATE CHANNEL: put     '/:id'     *
*                                       *
*****************************************/

const express = require('express');
const router  = express.Router()

// Importar Custom Middleware
const {check} = require('express-validator');
const { isArrayValid } = require('../helpers/isArray');
const { validarCampos } = require('../middleswares/validar-campos');
const { validarJWT } = require('../middleswares/validar-jwt');
const { verificaAdmin_Role } = require('../middleswares/validar-role');

// importar Controladores de mis rutas
const { crearChannel, listarChannel, eliminarChannel, editarChannel} = require('../controllers/channels');

// APLICAR Middlewares globales de las rutas de usuario
router.use(validarJWT)


// CREATE CHANNEL SERVICE
router.post( 
    '/create',
    [   // middleswares
        verificaAdmin_Role,
        check('title', 'El título es Obligatorio').not().isEmpty(),
        check('streamSrc', 'La fuente de streaming es Obligatoria').not().isEmpty(),
        check('description', 'La fuente de streaming es Obligatoria').not().isEmpty(),
        check('speakers', 'Los conferencistas son Obligatorios').exists(),
        check('speakers', 'El canal debe tener al menos un conferencista').isLength( {min:1} ),
        check('speakers.*', 'Id de Ponente no válido').isMongoId(),
        validarCampos
    ], 
    crearChannel
);


// LIST CHANNELS SERVICE
router.get( '/', listarChannel);


// DELETE CHANNEL SERVICE
router.delete(
    '/:id',
    // middleswares
    verificaAdmin_Role
    , 
    eliminarChannel
);


// UPDATE CHANNEL SERVICE
router.put(
    '/:id',
    [   
        // middleswares
        verificaAdmin_Role,
        check('speakers', 'El canal debe tener al menos un conferencista').custom( isArrayValid ),
        validarCampos
    ]
    , 
    editarChannel
);

module.exports = router;