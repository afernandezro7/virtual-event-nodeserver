/************************************************
*                [POSTER] ROUTES                *
*               host + /api/poster              *
*-----------------------------------------------*  
*    CREATE POSTER: post        '/create'       *
*       GET POSTER: get         '/list'         *
*    DELETE POSTER: delete      '/:id'          *
*                                               *
************************************************/
  

const express = require('express');
const fileUpload = require('express-fileupload');


const router  = express.Router()

// Importar Custom Middleware
const {check} = require('express-validator');
const { validarCampos } = require('../middleswares/validar-campos');
const { validarJWT } = require('../middleswares/validar-jwt');
const { verificaAdmin_Role } = require('../middleswares/validar-role');
const { validarExtensionesImagenOpcional } = require('../middleswares/validar-extensiones');
const { galleryImageValidation } = require('../middleswares/validar-tiposImagenes');

// importar Controladores de mis rutas
const { crearPoster, listarPosters, eliminarPoster } = require('../controllers/poster');

// APLICAR Middlewares globales de las rutas de usuario
router.use([validarJWT, fileUpload()])




// UPLOAD PICTURE SERVICE
router.post(
    '/create/:type',
    [   // middleswares
        verificaAdmin_Role,
        check('title', 'El título del Poster es Obligatorio').not().isEmpty(),
        check('alt', 'El texto alternativo del Poster es Obligatorio').not().isEmpty(),
        check('info', 'La descripción del Poster es Obligatoria').not().isEmpty(),
        validarExtensionesImagenOpcional,
        galleryImageValidation,
        validarCampos
    ], 
    crearPoster
)

// GET LIST OF POSTERS SERVICE
router.get( '/list', listarPosters);

// DELETE CHANNEL SERVICE
router.delete(
    '/:id',
    // middleswares
    verificaAdmin_Role
    , 
    eliminarPoster
);

module.exports = router;