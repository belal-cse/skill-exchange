const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

const APP_ID = process.env.AGORA_APP_ID || '';
const APP_CERTIFICATE = process.env.AGORA_APP_CERTIFICATE || '';

exports.generateToken = (req, res) => {
    // Channel Name can be a session ID or just a unique string
    const channelName = req.query.channelName;
    if (!channelName) {
        return res.status(400).json({ error: 'channelName is required' });
    }

    // Uid is required by Agora, using 0 for dynamic uid assignment
    const uid = 0;
    const role = RtcRole.PUBLISHER;

    const expirationTimeInSeconds = 3600; // 1 hour
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTimestamp = currentTimestamp + expirationTimeInSeconds;

    if (!APP_ID || !APP_CERTIFICATE) {
        return res.status(500).json({ error: 'Agora APP_ID and APP_CERTIFICATE are not set in .env' });
    }

    const token = RtcTokenBuilder.buildTokenWithUid(
        APP_ID,
        APP_CERTIFICATE,
        channelName,
        uid,
        role,
        privilegeExpiredTimestamp
    );

    res.json({ token, appId: APP_ID });
};
