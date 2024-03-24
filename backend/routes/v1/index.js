const express = require('express');
const videoRoutes = require('./video.routes');
// const userRoutes = require('./user.routes')
const router = express.Router();

// const debug = (req, res, next)=>{
//     res.json({"message":"inside routes/index.js"})
// }

// router.use('/videos',debug, videoRoutes);
router.use('/videos', videoRoutes);
// router.use('/user', userRoutes);


module.exports = router;