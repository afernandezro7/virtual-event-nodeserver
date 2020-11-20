const Poster = require('../models/Poster');
const { deletePicture } = require('./deletePicture');


const uploadGalleryPoster = (posterId, res, fileName,)=>{
  
    Poster.findById(posterId, (err, posterDB)=>{

        if (err){
            // Delete Temp picture storage
            deletePicture(fileName, 'galeria')

            return res.status(500).json({
                ok: false,
                msg: err
            });
        }

        if (!posterDB){
            // Delete Temp picture storage
            deletePicture(fileName, 'galeria')
            
            return res.status(400).json({
                ok: false,
                msg: 'No existe el poster con el Id enviado'
            });
        }

        if(!!posterDB.img){
            deletePicture(posterDB.img, 'galeria')
        }

        posterDB.img = fileName;
        posterDB.save( (err, posterUpdated)=>{

            if(err){
                return res.status(500).json({
                    ok: false,
                    msg: err
                });
            }

            return res.status(200).json({
                ok: true,
                msg: 'Poster creado o actualizado correctamente',
                poster: posterUpdated
            });
        })

    })
}

module.exports={
    uploadGalleryPoster
}