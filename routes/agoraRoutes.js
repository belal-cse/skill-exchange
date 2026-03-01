const express = require('express');
const router = express.Router();
const agoraController = require('../controllers/agoraController');
const auth = require('../middleware/auth');

router.get('/token', auth, agoraController.generateToken);

module.exports = router;
