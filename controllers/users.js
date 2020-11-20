/*************************************
*          [USERS] CONTROLLERS       *
*               ADMIN_ROLE           *
**************************************/

const { response } = require('express');// se declara express para recuperar el tipado es OPCIONAL
const bcrypt = require('bcryptjs');
const _ = require('underscore');

// Cargar Models de la BD
const Usuario = require('../models/Usuario');

// Helper para subir la imagen y asignarla al usuario creado y controlar las imagenes basura del
const {userImageControl} = require('../helpers/userImageControl'); 
const {deletePicture} = require('../helpers/deletePicture');




/*
    [USERS] Register User Controller
*/
const crearUsuario = async( req, res = response)=>{

    // leer info del body del request {name,email password}
    const { email, password } = req.body;
    
    
    try {
        let usuario = await Usuario.findOne({ email: email})
        
        //validar si el usuario ya está registrado en bd
        if( usuario ){
            if( usuario.estado ){
                //validar si el usuario ya está registrado en bd
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese correo'
                });
    
            }else{
                
                let userToDB = _.pick(req.body, ['name', 'email', 'userName', 'password' , 'role', 'img']);              
                const salt = bcrypt.genSaltSync()
                userToDB.password = bcrypt.hashSync( password, salt )
                userToDB.estado = true

                const reactivatedUser= await Usuario.findByIdAndUpdate(usuario._id, userToDB,{new: true })

                if (!req.files || Object.keys(req.files).length === 0) {

                    // USER Saved without picture
                
                    return res.status(201).json({
                        ok: true,
                        msg:'Usuario creado correctamente',
                        usuario: reactivatedUser
                    });
            
                }else{
                    const archive = req.files.archive;
                    const pictureType = 'usuarios';
                    const pictureID = usuario._id;
                    const fileNameArray = archive.name.split('.');
                    const fileExt = fileNameArray[fileNameArray.length-1]

                    // Rename file with unique name
                    const fileName = `${ pictureID }-${new Date().getTime()}.${fileExt}`;

                    await archive.mv(`uploads/${pictureType}/${fileName}`)
                    
                    if(!!reactivatedUser.img){
                        deletePicture(reactivatedUser.img, 'usuarios')     
                    }
                    reactivatedUser.img = fileName;
                    await reactivatedUser.save()
                    
                    return res.status(201).json({
                        ok: true,
                        msg:'Usuario creado correctamente',
                        usuario: reactivatedUser
                    });
                }                
            }  
        }

        // Instanciar la base de datos encriptar password y Guardar la base de datos
        usuario = new Usuario( req.body )

        const salt = bcrypt.genSaltSync()
        usuario.password = bcrypt.hashSync( password, salt )
        await usuario.save()  

        userImageControl(req, res, usuario )


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el Administrador'
        });
    }

}



/*
    [USERS] List Users Controller
*/
const listarUsuarios = async( req, res = response)=>{
    
    try {
        const usuarios = await Usuario.find( { estado: true } )
                                      .sort('role')
         
        Usuario.countDocuments({ estado: true }, (err, conteo) => {

            res.status(200).json({
                ok: true,
                msg: 'Eventos Obtenidos',
                usuarios,
                conteo
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
    [USERS] EDIT User Controller
*/
const editarUsuario = ( req, res = response)=>{

    const usuarioID = req.params.id
    let body = _.pick(req.body, ['name', 'email', 'userName', 'role']);


    Usuario.findByIdAndUpdate(usuarioID, body, {new: true }, (err, usuarioDb) => {
        //Verificacion de ID inválido
        if (err) {
            console.log(err);
            return res.status(400).json({
                ok: false,
                msg:'Request inválido, Hable con el Admin'
            });
        }
        ////Verificacion de objeto no encontrado en DB
        if (!usuarioDb) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe el usuario'
            });
        }

        return res.status(200).json({
            ok: true,
            msg: 'Usuario Actualizado',
            usuario: usuarioDb
        })
    })   
    
}

/*
    [USERS] DESACTIVAR User Controller
*/
const desactivarUsuario = async ( req, res = response)=>{
    const usuarioID = req.params.id
    
    

    try {
        const usuario = await Usuario.findById(usuarioID)

        if(usuario){

            //Verificar si el usuario se encuentra desactivado en BD
            if(!usuario.estado){
                return res.status(404).json({
                    ok: false,
                    msg:'No existe el usuario'
                });
            }

            //Verificar SUPER_ADMIN_SYSTEM NO se puede borrar
            const superAdmin = 'a.fernandez.ro7@gmail.com'
            if(usuario.email === superAdmin){
                return res.status(400).json({
                    ok: false,
                    msg:'Este Usuario es el salvaje de la pentium 4 no lo puedes borrar, Que te has creido?'
                });
            }

            //Verificar un Admin no se puede borrar a si mismo
            const adminEmail = req.email
            if(usuario.email === adminEmail){
                return res.status(400).json({
                    ok: false,
                    msg:'No se pudo eliminar el usuario'
                });
            }
            
            // Desactivar usuario(NO se eliminarán)
            if(!!usuario.img){
                deletePicture(usuario.img, 'usuarios')   
            }
            const cambiaEstado = { estado: false, img: "" };
            await Usuario.findByIdAndUpdate(usuarioID, cambiaEstado , {new: true })

            return res.status(200).json({
                ok: true,
                msg:'Usuario eliminado'
            });
        }else{
            return res.status(404).json({
                ok: false,
                msg:'No existe el usuario'
            });
        }

    } catch (error) {
        console.log(error);
            return res.status(400).json({
                ok: false,
                msg:'Request inválido, Hable con el Admin'
            });
    }

}



module.exports = {
    crearUsuario,
    listarUsuarios,
    editarUsuario,
    desactivarUsuario
}