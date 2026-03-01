const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['teach', 'learn'], required: true },
    skillName: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
