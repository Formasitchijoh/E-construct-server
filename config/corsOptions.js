const allowedOptions = require('./allowedOrigins')

const corsOptions = {
    origin:(origin, callback) =>{
        if(allowedOptions.indexOf(origin) === -1 || !origin){
            callback(null, true)
        }else{
            callback(new Error('Not alloowed by CorsOptions'))
        }
    },
    optionSuccessStatus:200
}

module.exports = { corsOptions}