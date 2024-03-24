const mongoose = require('mongoose');

const votesSchema = new mongoose.Schema({
  upVotes: { type: Number, default: 0 },
  downVotes: { type: Number, default: 0 },
}, { _id: false });

let videoSchema = new mongoose.Schema({
  videoLink: {
    type: String,
    required: true,
    match: /^https:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]+$/
  },
  title: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true,
    enum: ["Education", "Sports", "Movies", "Comedy", "Lifestyle", "All"]
  },
  contentRating: {
    type: String,
    required: true,
    enum: ["Anyone", "7+", "12+", "16+", "18+"]
  },
  releaseDate: {
    type: String,
    default: ''
  },
  previewImage: {
    type: String,
    default: ''
  },
  votes: votesSchema,
  viewCount: {
    type: Number,
    default: 0
  }
});

videoSchema.pre('save', function (next) {
  if (!this.votes) {
    this.votes = { upVotes: 0, downVotes: 0 };
  }
  next();
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
