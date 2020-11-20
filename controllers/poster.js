/*************************************
*        [POSTER] CONTROLLERS        *
*------------------------------------*
*           Create Poster            *
*           List   Poster            *
*           Delete Poster            *
*           Update Poster            *
**************************************/

const { response } = require('express');// se declara express para recuperar el tipado es OPCIONAL

// Cargar Models de la BD
const Poster = require('../models/Poster');

// helpers
const { uploadGalleryPoster } = require('../helpers/uploadGalleryPoster');
const { deletePicture } = require('../helpers/deletePicture');


/*
    [POSTER] Create Poster Controller
*/
const crearPoster = async( req, res = response)=>{

    // leer info del body del request 
    const body = req.body;
    
    try {
        // Instanciar la base de datos encriptar password y Guardar la base de datos
        let poster = new Poster( req.body )
        await poster.save()  

        if (!req.files || Object.keys(req.files).length === 0) {

            // Poster Saved without picture
        
            res.status(201).json({
                ok: true,
                msg:'Poster creado correctamente',
                poster
            });

        }else{

            //  Save Poster with  picture

            // The name of the input field [archive] is used to retrieve the uploaded file
            const archive = req.files.archive;
            const pictureType = req.params.type;
            const pictureID = poster._id;
            const fileNameArray = archive.name.split('.');
            const fileExt = fileNameArray[fileNameArray.length-1]

            // Rename file with unique name
            const fileName = `${ pictureID }-${new Date().getTime()}.${fileExt}`;


            // Use the mv() method to place the file somewhere on your server
            archive.mv(`uploads/${pictureType}/${fileName}`, (err) => {
                if (err){
                    return res.status(500).json({
                        ok: false,
                        msg: err
                    });
                }
                
                // At this moment the picture is uploaded in the storage of the server,
                // Then proced whith the verification of the DB and update it          
               
                uploadGalleryPoster(pictureID, res, fileName)
                
            });
            



        }


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se pudo obtener el servicio. Por favor hable con el Administrador'
        });
    }

    
    
}

/*
    [POSTER] List Posters Controller
*/
const listarPosters = async( req, res = response)=>{

    try {
        const posters = await Poster.find()        
        Poster.countDocuments((err, conteo) => {
            if(err){
                res.status(404).json({
                    ok: false,
                    msg: 'No se pudo obtener los Posters',
                })
            }
            res.status(200).json({
                ok: true,
                msg: 'Posters obtenidos correctamente',
                chQty: conteo,
                posters
            })
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Hable con el admin'
        })
        
    }
}

/*
    [POSTER] Delete Poster Controller
*/
const eliminarPoster = ( req, res = response)=>{
    
    const posterID = req.params.id

    Poster.findByIdAndDelete( posterID,  (err, posterDB) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                ok: false,
                msg:'Request inválido, Hable con el Admin'
            });
        }

        if (!posterDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Poster no encontrado'  
            });
        }

        if(!!posterDB.img){
            deletePicture(posterDB.img, 'galeria')
        }

        return res.status(200).json({
            ok: true,
            msg:'Poster eliminado'
        });
        
    
    })  
}


module.exports = {
    crearPoster,
    listarPosters,
    eliminarPoster
}