const { uploadUserPic } = require("./uploadUserPic");

const userImageControl = (req, res, usuario)=>{

    if (!req.files || Object.keys(req.files).length === 0) {

        // Poster Saved without picture
    
        return res.status(201).json({
            ok: true,
            msg:'Usuario creado correctamente',
            usuario
        });

    }else{

        //  Save User with  picture

        // The name of the input field [archive] is used to retrieve the uploaded file
        const archive = req.files.archive;
        const pictureType = 'usuarios';
        const pictureID = usuario._id;
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
           
            uploadUserPic(pictureID, res, fileName)
            
        });
    }
} 

module.exports={
    userImageControl
}