/*************************************
*        [CHANNEL] CONTROLLERS       *
*------------------------------------*
*           Create Channel           *
*           List   Channel           *
*           Delete Channel           *
*           Update Channel           *
**************************************/

const { response } = require('express');// se declara express para recuperar el tipado es OPCIONAL
const _ = require('underscore');

// Cargar Models de la BD
const Channel = require('../models/Channel');





/*
    [CHANNEL] Create Channel Controller
*/
const crearChannel = async( req, res = response)=>{

    // leer info del body del request 
    const body = req.body;
    
    try {
        // Instanciar la base de datos encriptar password y Guardar la base de datos
        let channel = new Channel( req.body )
        await channel.save()  


        res.status(201).json({
            ok: true,
            msg:'Canal creado correctamente',
            channel
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
    [CHANNEL] List Channel Controller
*/
const listarChannel = async( req, res = response)=>{

    try {
        const channels = await Channel.find().populate('speakers',  'name title country topic whatsApp')        
        Channel.countDocuments((err, conteo) => {
            if(err){
                res.status(404).json({
                    ok: false,
                    msg: 'No se pudo obtener los canales',
                })
            }
            res.status(200).json({
                ok: true,
                msg: 'Canales obtenidos correctamente',
                chQty: conteo,
                channels
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
    [CHANNEL] Delete Channel Controller
*/
const eliminarChannel = ( req, res = response)=>{
    
    const channelID = req.params.id

    Channel.findByIdAndDelete(channelID,  (err, channelDb) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                ok: false,
                msg:'Request inválido, Hable con el Admin'
            });
        }

        if (!channelDb) {
            return res.status(404).json({
                ok: false,
                msg: 'Canal no encontrado'  
            });
        }

        return res.status(200).json({
            ok: true,
            msg:'Canal eliminado'
        });
        
    
    })  
}

/*
    [CHANNEL] Update Channel Controller
*/
const editarChannel = ( req, res = response)=>{
    
    const channelID = req.params.id
    let body = _.pick(req.body, ['title', 'speakers', 'streamSrc', 'description']);

    Channel.findByIdAndUpdate(channelID, body,{ new: true }, (err, channelDb) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                ok: false,
                msg:'Request inválido, Hable con el Admin'
            });
        }

        if (!channelDb) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'Canal no encontrado'
                }
            });
        }

        return res.status(200).json({
            ok: true,
            msg:'Canal actualizado',
            channel:channelDb
        });
        
    
    })  
}




module.exports = {
    crearChannel,
    eliminarChannel,
    listarChannel,
    editarChannel,
    
}