const Joi = require('joi');

const videoSchema = Joi.object({
  // videoLink: Joi.string().pattern(/^youtube\.com\/embed\/[a-zA-Z0-9_-]+$/).required(),
  videoLink: Joi.string().pattern(/^https:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]+$/).required(),
  title: Joi.string().required(),
  genre: Joi.string().valid("Education", "Sports", "Movies", "Comedy", "Lifestyle", "All").required(),
  contentRating: Joi.string().valid("Anyone", "7+", "12+", "16+", "18+").required(),
  releaseDate: Joi.string().required(),
  previewImage: Joi.string().uri().required(),
  votes: Joi.object({
    upVotes: Joi.number().integer().min(0),
    downVotes: Joi.number().integer().min(0)
  }),
  viewCount: Joi.number().integer().min(0)
});


function validateVideo(req, res, next) {
    const { error } = videoSchema.validate(req.body);
    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(', ');
      return res.status(400).json({ error: errorMessage });
    }
    next();
  }
  
module.exports = validateVideo;

