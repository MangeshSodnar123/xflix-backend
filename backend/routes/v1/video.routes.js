const { videoController } = require('../../controllers');
const express = require('express')
const validateVideo = require('../../validations/video.validation');
const validateVote = require('../../validations/vote.validation');
const validateId = require('../../validations/videoId.validation');
const router = express.Router();  


router.get('/:videoId', validateId, videoController.getVideo);
router.get('/', videoController.getVideos);

router.post('/', validateVideo, videoController.createVideo);

router.patch('/:videoId/votes',validateId, validateVote, videoController.patchVote);
router.patch('/:videoId/views',validateId, videoController.patchViews);

module.exports = router;