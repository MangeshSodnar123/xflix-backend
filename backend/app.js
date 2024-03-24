const express = require('express');
require('dotenv').config(); //require to load env variables from .env file
const httpStatus = require('http-status');
const cors = require('cors');
// const { json } = require('body-parser');
const routes = require('./routes/v1')
const app = express();

//supportive middlewares 
app.use(cors());
app.use(express.json())

app.use('/v1', routes);
// const videoRoutes = require('./routes/v1/videos.routes')
// app.use('/v1/videos', videoRoutes);

app.use((req, res)=>{
    res.status(httpStatus.OK).json({"message":"No such route found"});
})


module.exports = app;