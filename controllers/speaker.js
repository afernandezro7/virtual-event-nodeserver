/*************************************
*        [SPEAKER] CONTROLLERS       *
*------------------------------------*
*           Create Speaker           *
*           List   Speaker           *
*           Delete Speaker           *
*           Update Speaker           *
**************************************/

const { response } = require('express');// se declara express para recuperar el tipado es OPCIONAL
const _ = require('underscore');

// Cargar Models de la BD
const { Speaker } = require('../models/Speaker');

// Importar helper para generar JSON Web Token
const { generarJWT } = require('../helpers/jwt');




/*
    [SPEAKER] Create Speaker Controller
*/
const crearSpeaker = async( req, res = response)=>{


    try {
        // Instanciar la base de datos encriptar password y Guardar la base de datos
        let speaker = new Speaker( {
            ...req.body,
            usuario:{
                _id: req.body.usuario.uid
            }
        })
        await speaker.save()  

        res.status(201).json({
            ok: true,
            msg:'Ponente creado correctamente',
            speaker
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se pudo obtener el servicio. Por favor hable con el Administrador'
        });
    }
    
}


/*
    [SPEAKER] List Speakers Controller
*/
const listarSpeakers = async( req, res = response)=>{

    try {
        const speakers = await Speaker.find().populate('usuario', 'name email userName img role')    

        Speaker.countDocuments((err, conteo) => {
            if(err){
                res.status(404).json({
                    ok: false,
                    msg: 'No se pudo obtener los Ponentes',
                })
            }
            res.status(200).json({
                ok: true,
                msg: 'Ponentes Obtenidos',
                chQty: conteo,
                speakers
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
    [SPEAKER] Delete Speakers Controller
*/
const eliminarSpeaker = ( req, res = response)=>{
    
    const speakerID = req.params.id

    Speaker.findByIdAndDelete(speakerID,  (err, speakerDb) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                ok: false,
                msg:'Request inválido, Hable con el Admin'
            });
        }

        if (!speakerDb) {
            return res.status(404).json({
                ok: false,
                msg: 'Ponente no encontrado'  
            });
        }

        return res.status(200).json({
            ok: true,
            msg:'Ponente eliminado'
        });
        
    
    })  
}



/*
    [SPEAKER] Update Speaker Controller
*/
const editarSpeaker = ( req, res = response)=>{
    
    const speakerID = req.params.id
    let body = _.pick(req.body, ['name', 'title', 'country', 'topic', 'whatsApp']);

    Speaker.findByIdAndUpdate(speakerID, body,{ new: true }, (err, speakerDb) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                ok: false,
                msg:'Request inválido, Hable con el Admin'
            });
        }

        if (!speakerDb) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'Ponente no encontrado'
                }
            });
        }

        return res.status(200).json({
            ok: true,
            msg:'Ponente actualizado',
            speaker:speakerDb
        });
        
    
    })  
}

module.exports = {
    crearSpeaker,
    listarSpeakers,
    eliminarSpeaker,
    editarSpeaker
    
}