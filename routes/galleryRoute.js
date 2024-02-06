const express = require('express');
const Gallery = require('../model/galleryModel');





const galleryRouter = express.Router();

galleryRouter.get('/', async (req, res) => {
    try {
        const data = await Gallery.find({});
        res.send(data);
    } catch (err) {
        res.send(err);
    }
});

galleryRouter.get("/:id", async (req, res) => {
    const photo = await Gallery.findById(req.params.id);
    if (photo) {
        res.send(photo);
    } else {
        res.status(404).send({ message: "photo Not Found" });
    }
});

galleryRouter.post('/', async (req, res) => {
    const newgallery = new Gallery({
        image: req.body.image,
    });
    const gallery = await newgallery.save();
    res.status(201).send({ message: 'New gallery Created', gallery });
});



module.exports = galleryRouter;