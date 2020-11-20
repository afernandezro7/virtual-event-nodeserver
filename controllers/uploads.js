/*************************************
*        [UPLOADS] CONTROLLERS       *
*------------------------------------*
*           UPLOAD PICTURE           *
*              GET PICTURE           *
**************************************/

const { response } = require('express');// se declara express para recuperar el tipado es OPCIONAL

const { uploadUserPic } = require('../helpers/uploadUserPic');
const { uploadGalleryPoster } = require('../helpers/uploadGalleryPoster');

const path = require('path');
const fs = require('fs');

/*
    [UPLOADS] Upload Picture Controller
*/
const uploadPicture = ( req, res = response)=>{

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    const archive = req.files.archive;
    const pictureType = req.params.type;
    const pictureID = req.params.id;
    const fileNameArray = archive.name.split('.');
    const fileExt = fileNameArray[fileNameArray.length-1]

    // Rename file with unique name
    const fileName = `${ pictureID }-${new Date().getTime()}.${fileExt}`;
    
    // Use the mv() method to place the file somewhere on your server
    archive.mv(`uploads/${pictureType}/${fileName}`, (err) => {
        if (err){
            return res.status(500).json({
                ok: false,
                msg: err
            });
        }
        
        // At this moment the picture is uploaded in the storage of the server,
        // Then proced whith the verification of the DB and update it

        if (pictureType === 'usuarios') {           
            uploadUserPic(pictureID, res, fileName)
        } else if (pictureType === 'galeria'){
            uploadGalleryPoster(pictureID, res, fileName)
        }
        
    });
}


/*
    [UPLOADS] get Picture Controller
*/
const getPicture = ( req, res = response)=>{

    const pictureType = req.params.type;
    const picture = req.params.img;

    const pathImg = path.resolve(__dirname, `../uploads/${pictureType}/${picture}`)
    const pathNoImg = path.resolve(__dirname, '../assets/no-image.jpg')
    const pathNoUserImg = path.resolve(__dirname, '../assets/no-user-image.png')
   
    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }else{
        if(pictureType==='usuarios'){
            res.sendFile(pathNoUserImg);

        }else{
            res.sendFile(pathNoImg);
        }
    }

   
}

module.exports = {
    uploadPicture,
    getPicture
}