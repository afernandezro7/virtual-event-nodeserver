const { Schema, model } = require('mongoose');


const UsuarioSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true  
    },
    userName: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false,
        default: ""
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        
    },
    estado: {
        type: Boolean,
        default: true
    }
});

UsuarioSchema.method('toJSON', function(){
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object
})



module.exports = model('Usuario', UsuarioSchema);