const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema(
    {
        members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true }],
        lastMessage: { type: String },
        senderId: {type: String},
        lastMessageTimestamp: { type: Date, default: Date.now }
    },
    {
        timestamps: true,
    }
);
const ChatModel = mongoose.model('Chat', ChatSchema);
module.exports = ChatModel;