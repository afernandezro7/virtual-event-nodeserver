const { Schema, model } = require('mongoose');


const PosterSchema = Schema({
    title:{
        type: String,
        required: true
    },
    img:{
        type: String,
        required: false,
        default: ""
    },
    alt:{
        type: String,
        required: true
    },
    info:{
        type: String,
        required: true
    }
})

PosterSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object
})



module.exports = model('Poster', PosterSchema);