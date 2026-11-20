const express = require('express');
const { userregisterdController, userLoginController } = require('../controllers/auth');

const router = express.Router();

router.post('/signup', userregisterdController);
router.post('/login', userLoginController);

module.exports = router;
