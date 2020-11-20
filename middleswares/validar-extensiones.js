const { response }  = require('express');// opcional para optener tipado


const validarExtensionesImagen = (req, res = response , next) =>{

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No se ha seleccionado ninguna imagen'
        });
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    const archive = req.files.archive;

    // Extensiones permitidas
    const validExt = ['png', 'jpg', 'jpeg', 'gif'];
    const fileNameArray = archive.name.split('.');
    const fileExt = fileNameArray[fileNameArray.length-1]
    
    if(validExt.indexOf(fileExt) < 0){
        return res.status(500).json({
            ok: false,
            msg: `Extensión no válida, solo se admiten las extensiones: ${validExt.join(', ')} `,
            ext: fileExt
        });
    }

    next();
}

//  Validar cuando no es requerido enviar la imagen
const validarExtensionesImagenOpcional = (req, res = response , next) =>{

    if (!req.files || Object.keys(req.files).length === 0) {
        
        next();

    }else{
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        const archive = req.files.archive;

        // Extensiones permitidas
        const validExt = ['png', 'jpg', 'jpeg', 'gif'];
        const fileNameArray = archive.name.split('.');
        const fileExt = fileNameArray[fileNameArray.length-1]
        
        if(validExt.indexOf(fileExt) < 0){
            return res.status(500).json({
                ok: false,
                msg: `Extensión no válida, solo se admiten las extensiones: ${validExt.join(', ')} `,
                ext: fileExt
            });
        }

        next();
    }

    

    
}

module.exports = {
    validarExtensionesImagen,
    validarExtensionesImagenOpcional
}