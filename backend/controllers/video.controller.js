const httpStatus = require('http-status');
const { videoService } = require('../services')


const getVideos = async (req, res) => {
    try {
      const { title, genres, contentRating, sortBy } = req.query;
      const videos = await videoService.getVideos({ title, genres, contentRating, sortBy });
    //   console.log("type of videos:",typeof videos)
      console.log("videos:",videos)
      res.json({videos});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

const getVideo = async (req, res)=>{ 
    let id = req.params.videoId;
    let video = await videoService.getVideoById(id);
    // console.log('id: ',id);
    res.status(httpStatus.OK).json(video)
}

const createVideo = async(req, res)=>{ 
    let video = req.body;
    console.log("video: ",req.body);
    let newVideo = await videoService.createVideo(video);
    res.status(httpStatus.CREATED).json(newVideo)
}

const patchVote = async (req, res) => {
    let id = req.params.videoId;
    let { vote, change } = req.body;

    try {
        let patchedVideo = await videoService.updateVote(id, vote, change);
        res.status(204).send();
    } catch (err) {
        console.error("Error updating vote:", err);
        res.status(500).json({ "error": "Internal server error" });
    }
}


const patchViews = async (req, res) => {
    let id = req.params.videoId;

    try {
        let patchedViewsVideo = await videoService.increaseViews(id);
        console.log("video: ", patchedViewsVideo);
        res.status(204).send();
    } catch (err) {
        console.error("Error updating views:", err);
        res.status(500).json({ "error": "Internal server error" });
    }
}


module.exports = {getVideos, getVideo, createVideo, patchVote, patchViews}