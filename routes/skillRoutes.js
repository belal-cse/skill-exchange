const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');
const auth = require('../middleware/auth');

router.post('/post', auth, skillController.postSkill);
router.get('/match', auth, skillController.matchSkills);

module.exports = router;
