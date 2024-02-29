function errorParser (error){
    if(Array.isArray(error)){
        //express-validator
        return error.map(err => err.msg).join('\n');
    } else if (error.name == 'ValidationError'){
        //mongoose
        return Object.values(error.errors).map(err=>err.message).join('\n');
    } else {
        return error.message;
    }
}

module.exports = errorParser;