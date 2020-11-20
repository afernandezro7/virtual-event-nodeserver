const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWTParams = (req = request, res = response , next) => {

    // token headers
    const token = req.query.token;

    // validar que en el request venga el token
    if( !token){
        return res.status(401).json({
            ok:false,
            msg: 'No hay token en la petición'
        })
    }

    // validar que  el token sea correcto
    try {
        
        const payloadJWT = jwt.verify( token, process.env.SECRET_JWT_SEED )
        
        //Se puede validar opcional que el token esté expirado para renovarlo
        //console.log(payloadJWT);

        // imponerle al body un info del usuario para que el controller lo renueve
        req.uid = payloadJWT.uid
        req.name = payloadJWT.name
        req.role = payloadJWT.role
        req.email = payloadJWT.email

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Tóken no válido'
        })
    }

    next()
}

module.exports = {
    validarJWTParams
}