const { response }  = require('express');// opcional para optener tipado
const { validationResult } = require('express-validator');


const validarCampos = (req, res = response , next) =>{

    // manejo de errores
    const errors = validationResult( req )

    if( !errors.isEmpty() ){
        return res.status(400).json({
            ok: false,
            msg: 'No se pudo completar la acción correctamente',
            errors: errors.mapped()
        })
    }

    next();
}

module.exports = {
    validarCampos
}