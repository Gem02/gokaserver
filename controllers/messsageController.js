const messageModel = require('../models/message');
const ChatModel = require('../models/chat');

const addMessage = async (req, res) =>{
    const {chatId, senderId, text} = req.body.message;
    const message = new messageModel({
        chatId, senderId, text
    });

    try {
        const result  = await message.save();
        await ChatModel.findByIdAndUpdate(chatId, {
            lastMessage: text,
            senderId,
            lastMessageTimestamp: new Date()
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getMessages = async (req, res) =>{
    const {chatId} = req.params
    try {
        const result =  await messageModel.find({chatId});
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}


module.exports = {addMessage, getMessages};