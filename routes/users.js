/*************************************
*            [USERS] ROUTES           *
*           host + /api/users         *
**************************************/

const express = require('express');
const fileUpload = require('express-fileupload');
const router  = express.Router()

// Importar Custom Middleware
const {check} = require('express-validator')
const { validarCampos } = require('../middleswares/validar-campos');
const { validarJWT } = require('../middleswares/validar-jwt');
const { verificaAdmin_Role } = require('../middleswares/validar-role');
const { validarExtensionesImagenOpcional } = require('../middleswares/validar-extensiones');
const { userImageValidation } = require('../middleswares/validar-tiposImagenes');


// importar Controladores de mis rutas
const { crearUsuario, listarUsuarios, editarUsuario, desactivarUsuario } = require('../controllers/users');

// APLICAR Middlewares globales de las rutas de usuario
router.use( [validarJWT , verificaAdmin_Role, fileUpload()])



// REGISTER USER SERVICE
router.post( 
    '/register',
    [   // middleswares
        check('name', 'El nombre es Obligatorio').not().isEmpty(),
        check('userName', 'El nombre es Obligatorio').not().isEmpty(),
        check('email', 'El email es Obligatorio').isEmail(),
        check('password', 'El password debe ser mayor que 6 caractéres').isLength({min: 6}),
        validarExtensionesImagenOpcional,
        validarCampos
    ], 
    crearUsuario
);

// LIST USERS SERVICE
router.get( 
    '/userlist',
    // middleswares  
    listarUsuarios

);

// EDIT USER SERVICE
router.put( 
    '/:id',
    // middleswares
    editarUsuario

);

// EDIT USER SERVICE
router.delete( 
    '/:id',
    // middleswares
    desactivarUsuario
);



module.exports = router;