

const isArrayValid = ( value, rest)=>{

    if( Array.isArray(value) && value.length > 0){

        return true;
    }else{
        if(!value){
            return true;
        }else{
            return false
        }
    }
}



module.exports = {
    isArrayValid
}