/****************************************
*          [SPEAKER] ROUTES             *
*         host + /api/speaker           *
*---------------------------------------*  
*    CREATE SPEAKER: post    '/create'  *
*      LIST SPEAKER: get     '/'        *
*    DELETE SPEAKER: delete  '/:id'     *
*    UPDATE SPEAKER: put     '/:id'     *
*                                       *
*****************************************/

const express = require('express');
const router  = express.Router()

// Importar Custom Middleware
const { validarJWT } = require('../middleswares/validar-jwt');
const { verificaAdmin_Role } = require('../middleswares/validar-role');
const {check} = require('express-validator');
const { validarCampos } = require('../middleswares/validar-campos');

// importar Controladores de mis rutas
const { crearSpeaker, listarSpeakers, eliminarSpeaker, editarSpeaker } = require('../controllers/speaker');


// APLICAR Middlewares globales de las rutas de usuario
router.use(validarJWT)


// CREATE SPEAKER SERVICE
router.post( 
    '/create',
    [   // middleswares
        verificaAdmin_Role,
        check('name', 'El nombre del conferencistas es Obligatorio').not().isEmpty(),
        check('title', 'El título del conferencistas es Obligatorio').not().isEmpty(),
        check('country', 'El País del conferencistas es Obligatorio').not().isEmpty(),
        check('whatsApp', 'El whatsApp del conferencistas es Obligatorio').not().isEmpty(),
        check('topic', 'El Tema de su conferencia es Obligatorio').not().isEmpty(),
        check('usuario', 'El UserId del Ponente es Obligatorio').exists(),
        check('usuario.uid', 'El UserId no es válido').isMongoId(),
        validarCampos
    ], 
    crearSpeaker
);


// LIST SPEAKERS SERVICE
router.get( '/', listarSpeakers);


// DELETE SPEAKER SERVICE
router.delete(
    '/:id',
    // middleswares
    verificaAdmin_Role
    , 
    eliminarSpeaker
);


// UPDATE SPEAKER SERVICE
router.put(
    '/:id', 
    // middleswares
    verificaAdmin_Role,
    check('usuario', 'Este servicio no admite editar el usuario del Ponente').not().exists(),
    validarCampos, 
    editarSpeaker
);

module.exports = router;