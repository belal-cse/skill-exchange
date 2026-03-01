const Skill = require('../models/Skill');
const User = require('../models/User');

exports.postSkill = async (req, res) => {
    try {
        const { type, skillName } = req.body;
        const skill = new Skill({ userId: req.user.userId, type, skillName });
        await skill.save();

        // Also update the user model for quick access (matching needs it in User model too based on schema provided in requirements)
        if (type === 'teach') {
            await User.findByIdAndUpdate(req.user.userId, { $addToSet: { skillsToTeach: skillName } });
        } else {
            await User.findByIdAndUpdate(req.user.userId, { $addToSet: { skillsToLearn: skillName } });
        }

        res.status(201).json(skill);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.matchSkills = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        const { skillsToTeach, skillsToLearn } = user;

        const matches = await User.find({
            _id: { $ne: req.user.userId },
            $or: [
                { skillsToLearn: { $in: skillsToTeach } }, // Others who want what I teach
                { skillsToTeach: { $in: skillsToLearn } }  // Others who teach what I want
            ]
        }).select('-password');

        res.json(matches);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
