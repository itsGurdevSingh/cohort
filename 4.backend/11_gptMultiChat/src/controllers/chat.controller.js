const chatModel = require("../models/chat.model")

const createChat = async (req, res) => {
    const title = req.body.title || ''

    try {
        const chat = await chatModel.create({ user: req.user._id, title })

        res.status(201).json({ chatID: chat._id })
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: 'failed to create chat' })
    }

}

module.exports = {
    createChat
}