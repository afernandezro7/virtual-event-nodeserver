const jwt = require('jsonwebtoken');

const generarJWT = ( uid, name, role, email )=>{

    return new Promise ( (resolve, reject) =>{

        const payload = { uid, name, role, email}

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {expiresIn: '48h'} , (err, token)=>{

            if(err){
                reject('No se pudo generar token')
            }
           
            resolve( token )
        })
    })

}


module.exports = {
    generarJWT
}