const fs = require('fs');
const path = require('path');

const deletePicture= (filename, type)=>{
    let pathImg = path.resolve(__dirname, `../uploads/${type}/${filename}`)
    
    if(fs.existsSync(pathImg)){
        fs.unlinkSync(pathImg);
    }
}

module.exports= {
    deletePicture
}