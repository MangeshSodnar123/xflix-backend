// const { Video } = require("../models");
const Video = require("../models/video.model");

const getVideos = async ({ title, genres, contentRating, sortBy }) => {
  let query = {};

  if (title) {
    query.title = { $regex: title, $options: "i" };
  }

  if (genres) {
    let genreArray = genres.split(",");
    if (genreArray.includes("All") || genreArray.includes("all")) {
      // If 'All' is in genres, return all videos
      query = {};
    } else {
      query.genre = { $in: genreArray };
    }
  }

  let videos = await Video.find(query);

  if (contentRating) {
    const contentRatingMap = {
      "Anyone": 0,
      "7+": 7,
      "12+": 12,
      "16+": 16,
      "18+": 18,
    };
    const rating = contentRatingMap[contentRating];
    console.log('videos from service :',videos);
    videos = videos.filter((video) => {
      const videoRating = contentRatingMap[video.contentRating];

      return videoRating >= rating || video.contentRating==="Anyone";
    });
  }

  if (sortBy === "releaseDate") {
    videos = videos.sort(
      (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
    );
  } else if (sortBy === "viewCount") {
    videos = videos.sort((a, b) => b.viewCount - a.viewCount);
  }
  return videos;
};

const getVideoById = async (id) => {
  const video = await Video.findOne({ _id: id });
  // console.log('videos: ',videos);
  return video;
};

const createVideo = async (video) => {
  try {
    const newVideo = new Video(video);

    await newVideo.save();

    console.log("New video created:", newVideo);
    return newVideo; // Return the newly created video
  } catch (err) {
    console.error("Error creating video:", err);
    throw err; // Rethrow the error to propagate it to the caller
  }
};

const updateVote = async (videoId, vote, change) => {
  let update = {};
  if (vote === "upVote" && change === "increase") {
    update = { $inc: { "votes.upVotes": 1 } };
  } else if (vote === "upVote" && change === "decrease") {
    update = { $inc: { "votes.upVotes": -1 } };
  } else if (vote === "downVote" && change === "increase") {
    update = { $inc: { "votes.downVotes": 1 } };
  } else if (vote === "downVote" && change === "decrease") {
    update = { $inc: { "votes.downVotes": -1 } };
  }

  const updatedVideo = await Video.findByIdAndUpdate(videoId, update, {
    new: true,
  });

  if (!updatedVideo) {
    throw new Error(`Video with ID ${videoId} not found`);
  }

  return updatedVideo;
};

const increaseViews = async (videoId) => {
  const update = { $inc: { viewCount: 1 } };

  const updatedVideo = await Video.findByIdAndUpdate(videoId, update, {
    new: true,
  });

  if (!updatedVideo) {
    throw new Error(`Video with ID ${videoId} not found`);
  }

  return updatedVideo;
};

module.exports = {
  getVideos,
  getVideoById,
  createVideo,
  updateVote,
  increaseViews,
};
