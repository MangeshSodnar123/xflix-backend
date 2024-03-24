const Joi = require('joi');

const voteSchema = Joi.object({
    vote : Joi.string().valid("upVote","downVote").required(),
    change : Joi.string().valid("increase","decrease").required()
})


const validateVote = (req, res, next)=>{
    const { error} = voteSchema.validate(req.body);

    if(error){
        const errorMessage = error.details.map((detail) => detail.message).join(', ');
        return res.status(400).json({ error: errorMessage });
    }
    next();
}

module.exports = validateVote;
