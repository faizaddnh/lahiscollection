const express = require('express');
const Video = require('../model/videoModel');





const videoRouter = express.Router();

videoRouter.get('/', async (req, res) => {
    try {
        const data = await Video.find({});
        res.send(data);
    } catch (err) {
        res.send(err);
    }
});

videoRouter.get("/:id", async (req, res) => {
    const video = await Video.findById(req.params.id);
    if (video) {
        res.send(video);
    } else {
        res.status(404).send({ message: "video Not Found" });
    }
});

videoRouter.post('/', async (req, res) => {
    const newvideo = new Video({
        video: req.body.video,
    });
    const video = await newvideo.save();
    res.status(201).send({ message: 'New video Created', video });
});



module.exports = videoRouter;