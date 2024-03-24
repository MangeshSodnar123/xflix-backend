const Joi = require('joi');

const idSchema = Joi.object({
    videoId: Joi.string().required().length(24).hex()
})

const validateId = (req, res, next)=>{
    const {error} = idSchema.validate(req.params)

    if(error){
        res.status(400).json({"error": error.message})
    }

    next();
} 

module.exports = validateId;