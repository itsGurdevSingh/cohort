const express = require("express");
const multer = require("multer");
const uploadToImagekit = require("../service/storage.service.js");
const SongModel = require("../models/song.model.js")

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single("audio"), async (req, res) => {
    try {
        const { name, artist, mood } = req.body;
        const file = req.file;

        if (!name || !artist || !mood || !file) {
            return res.status(400).send({ message: "Missing required fields or file" });
        }

        const uploadedFile = await uploadToImagekit(file);
        console.log('Uploaded file:', uploadedFile.url);
        const mongoObj = await SongModel.create({
            name,
            artist,
            mood,
            audio: uploadedFile.url
        })


        res.status(201).send({
            message: "Audio uploaded successfully",
            url: uploadedFile.url,
            obj: mongoObj
        });
    } catch (err) {
        console.error("Upload error:", err);
        res.status(500).send({ message: "Failed to upload audio", error: err.message });
    }
});

module.exports = router;
