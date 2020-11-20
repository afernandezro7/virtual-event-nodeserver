const { Schema, model } = require('mongoose');



const ChannelSchema = Schema({
    title:{
        type: String,
        required: true
    },
    streamSrc:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    speakers:[{
        type: Schema.Types.ObjectId, 
        ref: 'Speaker', 
        required: true 
    }      
    ]
})

ChannelSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object
})



module.exports = model('Channel', ChannelSchema);