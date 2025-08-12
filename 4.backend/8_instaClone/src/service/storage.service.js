const ImageKit = require("imagekit");

require("dotenv").config();

const imagekit = new ImageKit(
            {publicKey: process.env.IMAGEKIT_PUBLIC_KEY ,
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY ,
            urlEndpoint: process.env.IMAGEKIT_URL_END_POINT
            });

const uploadToImagekit = (file) => {

    return new Promise((resolve, reject) => {
        imagekit.upload({
            file: file.buffer,
            fileName: file.originalname
        }, (error, result) => {
            if (error) {
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}

module.exports = uploadToImagekit;
