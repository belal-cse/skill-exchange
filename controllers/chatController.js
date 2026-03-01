const Chat = require('../models/Chat');

exports.sendMessage = async (req, res) => {
    try {
        const { receiverId, message } = req.body;
        const chat = new Chat({ senderId: req.user.userId, receiverId, message });
        await chat.save();
        res.status(201).json(chat);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const { receiverId } = req.query; // Sender is current user
        const chats = await Chat.find({
            $or: [
                { senderId: req.user.userId, receiverId },
                { senderId: receiverId, receiverId: req.user.userId }
            ]
        }).sort({ createdAt: 1 });
        res.json(chats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
