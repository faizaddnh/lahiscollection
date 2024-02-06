const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser= require('body-parser');
const galleryRouter = require('./routes/galleryRoute');
const uploadRouter = require('./routes/uploadRoutes');
const videoRouter = require('./routes/videoRoute');
const port = process.env.PORT || 7000;


dotenv.config();
const app = express();


app.use(cors())
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use('/api/gallery',galleryRouter);
app.use('/api/video',videoRouter);
app.use('/api/upload', uploadRouter);

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    try {
        console.log('DataBase connected');
    } catch (err) {
        console.log(err.message);
    }
});


app.listen(port, ()=>{
    console.log('server running on port 7000')
});