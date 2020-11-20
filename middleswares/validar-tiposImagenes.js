const { response }  = require('express');// opcional para optener tipado


const typeImageValidation = (req, res = response , next) =>{

    // Type of Pictures Validation
    const PictureType = req.params.type;
    const validPicTypes = ['galeria', 'usuarios'];

    if (validPicTypes.indexOf(PictureType) < 0) {
        return res.status(500).json({
            ok: false,
            msg: `Tipos de imagenes admitidas son: ${validPicTypes.join(', ')} `,
            
        });
    }

    next();
}

const galleryImageValidation = (req, res = response , next) =>{

    if (!req.files || Object.keys(req.files).length === 0) {
        
        next();

    }else{

        // Type of Pictures Validation
        const PictureType = req.params.type;
        const validPicTypes = ['galeria'];
    
        if (validPicTypes.indexOf(PictureType) < 0) {
            return res.status(500).json({
                ok: false,
                msg: `Tipos de imagenes admitidas son: ${validPicTypes.join(', ')} `,
                
            });
        }
    
        next();
    }
}

const userImageValidation = (req, res = response , next) =>{

    if (!req.files || Object.keys(req.files).length === 0) {
        
        next();

    }else{

        // Type of Pictures Validation
        const PictureType = req.params.type;
        const validPicTypes = ['usuarios'];
    
        if (validPicTypes.indexOf(PictureType) < 0) {
            return res.status(500).json({
                ok: false,
                msg: `Tipos de imagenes admitidas son: ${validPicTypes.join(', ')} `,
                
            });
        }
    
        next();
    }
}

module.exports = {
    typeImageValidation,
    galleryImageValidation,
    userImageValidation
}