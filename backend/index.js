require('dotenv').config(); //require to load env variables from .env file
const app = require('./app');
const mongoose = require('mongoose');

const PORT1 = process.env.PORT1;
const MONGODB_URI = process.env.MONGODB_URI;


mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("Mongodb database connected...")
    app.listen(PORT1,()=>{
        console.log("Listening on port: ",PORT1)
    })
}) 