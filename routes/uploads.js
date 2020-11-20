/***********************************************
*             [UPLOADS] ROUTES                 *
*           host + /api/picture                *
*----------------------------------------------*  
*    UPLOAD PICTURE: put   '/upload/:type/:id' *
*       GET PICTURE: get   '/:type/:img'       *
*                                              *
************************************************/

const express = require('express');
const fileUpload = require('express-fileupload');

// Routes Controllers
const { uploadPicture, getPicture } = require('../controllers/uploads');

// Importar Custom Middleware
const { validarJWT } = require('../middleswares/validar-jwt');
const { validarExtensionesImagen } = require('../middleswares/validar-extensiones');
const { typeImageValidation } = require('../middleswares/validar-tiposImagenes');
const { validarJWTParams } = require('../middleswares/validar-jwtParams');


const router  = express.Router()

// APLICAR Middlewares globales de las rutas de usuario
// default options
router.use(fileUpload());


// UPLOAD PICTURE SERVICE
router.put(
    '/upload/:type/:id',
    [   // middleswares
        validarJWT,
        validarExtensionesImagen,
        typeImageValidation
    ], 
    uploadPicture
)

// GET PICTURE SERVICE
router.get(
    '/:type/:img',
    [   // middleswares
        validarJWTParams
    ], 
    getPicture
)


module.exports = router;
