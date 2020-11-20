/*************************************
*            [AUTH] ROUTES           *
*           host + /api/auth         *
**************************************/

const express = require('express');
const router  = express.Router()

// Importar Custom Middleware
const {check} = require('express-validator')
const { validarCampos } = require('../middleswares/validar-campos');
const { validarJWT } = require('../middleswares/validar-jwt');


// importar Controladores de mis rutas
const { loginUsuario, revalidarToken } = require('../controllers/auth');



// LOGIN
router.post( 
    '/',
    [   // middleswares
        check('email', 'El email es Obligatorio').isEmail(),
        check('password', 'El password debe ser mayor que 6 caractéres').isLength({min: 6}),
        validarCampos
    ],
    loginUsuario 

);

// Token Renew
router.get( 
    '/renew', 
    // middlesware
    validarJWT
    ,
    revalidarToken 
);



module.exports = router;