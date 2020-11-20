const { Schema, model } = require('mongoose');


const SpeakerSchema = Schema({
    name:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    topic:{
        type: String,
        required: true
    },
    whatsApp:{
        type: String,
        required: true
    },
    usuario:{ 
        type: Schema.Types.ObjectId, 
        ref: 'Usuario', 
        required: true 
    }
})

SpeakerSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;

    return object
})



module.exports = {
    Speaker:model('Speaker', SpeakerSchema),
    SpeakerSchema
};