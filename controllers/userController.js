const User = require('../models/User');

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { name, skillsToTeach, skillsToLearn } = req.body;
        const user = await User.findByIdAndUpdate(req.user.userId, { name, skillsToTeach, skillsToLearn }, { new: true });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updatePoints = async (req, res) => {
    try {
        const { receiverId } = req.body;
        // Requirements: "Add 10 points to both users"
        // sender is req.user.userId, receiver is receiverId
        await User.findByIdAndUpdate(req.user.userId, { $inc: { points: 10 } });
        await User.findByIdAndUpdate(receiverId, { $inc: { points: 10 } });
        res.json({ message: 'Skill points updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
