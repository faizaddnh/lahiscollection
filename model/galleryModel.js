const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gallerySchema = new Schema({
    image:{type: String},
    
},
{
    timestamps: true,
});

const Gallery = mongoose.model('Gallery', gallerySchema);
module.exports = Gallery;