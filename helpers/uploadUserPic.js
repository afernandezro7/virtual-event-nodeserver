const Usuario = require('../models/Usuario');

const { deletePicture } = require('./deletePicture');


const uploadUserPic = (uid, res, fileName)=>{
    
    Usuario.findOne({_id:uid, estado:true}, (err, userDB)=>{

        if (err){
            // Delete Temp picture storage
            deletePicture(fileName, 'usuarios')

            return res.status(500).json({
                ok: false,
                msg: err
            });
        }

        if (!userDB){
            // Delete Temp picture storage
            deletePicture(fileName, 'usuarios')
            
            return res.status(400).json({
                ok: false,
                msg: 'No existe usuario con el Id enviado'
            });
        }

        if(!!userDB.img){
            deletePicture(userDB.img, 'usuarios')     
        }

        userDB.img = fileName;
        userDB.save( (err, userUpdated)=>{

            if(err){
                return res.status(500).json({
                    ok: false,
                    msg: err
                });
            }

            return res.status(200).json({
                ok: true,
                msg: 'Usuario creado o actualizado correctamente',
                usuario: userUpdated
            });
        })

    })
}


module.exports={
    uploadUserPic
}