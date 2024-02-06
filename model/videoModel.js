const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({

    video:{type: String},
},
{
    timestamps: true,
});

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;