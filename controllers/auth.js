/*************************************
*          [AUTH] CONTROLLERS        *
**************************************/

const { response } = require('express');// se declara express para recuperar el tipado es OPCIONAL
const bcrypt = require('bcryptjs');

// Cargar Models de la BD
const Usuario = require('../models/Usuario');

// Importar helper para generar JSON Web Token
const { generarJWT } = require('../helpers/jwt');



/*
    [AUTH] login Controller
*/
const loginUsuario = async(req, res = response)=>{

    // leer info del body del request
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email: email, estado:true})
        
        //validar si el usuario ya está registrado en bd
        if( !usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario con ese email registrado'
            });
        }

        // Hacer match de contarseña para loguear
        const isValidPassword = bcrypt.compareSync( password, usuario.password)
        
        if(!isValidPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Pareja de Usuario y/o Contraseña inválido'
            });
        }
        

        //Generar JWT(JSON WEB TOKEN)
        const token = await generarJWT(usuario._id, usuario.name, usuario.role, email);

        
        // Usuario logueado correctamente
        res.status(200).json({
            ok: true,
            usuario,
            token
        });


    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el Administrador'
        });
    }

}


/*
    [AUTH] Token Renew Controller
*/
const revalidarToken = async (req, res = response)=>{

    // leer info  del request que impuso el middleware validar-jwt
    const uid = req.uid;
    const name = req.name;
    const role = req.role
    const email = req.email
    
    try {
        const user = await Usuario.findById(uid)

        if(!user){
            return res.status(404).json({
                ok: false,
                msg: 'uid no encontrado'  
            });
        }

        //Generar JWT(JSON WEB TOKEN)
        const token = await generarJWT(uid, name, role,email)

        res.status(200).json({
            ok: true,
            msg: 'Token was renew successfully',
            usuario: user,
            token  
        });
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg:'Request inválido, Hable con el Admin'
        });
    }

}



module.exports = {
    loginUsuario,
    revalidarToken
}


