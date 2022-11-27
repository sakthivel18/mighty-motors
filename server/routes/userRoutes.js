const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.post('/login', controller.login);
router.post('/signup', controller.signup);
router.get('/hasLoggedIn', controller.hasLoggedIn);
router.get('/signOut', controller.signOut);

module.exports = router;