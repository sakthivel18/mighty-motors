const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const loginRateLimiter = require('../middleware/loginRateLimiter');

router.post('/login', loginRateLimiter, controller.login);
router.post('/signup', controller.signup);
router.get('/hasLoggedIn', controller.hasLoggedIn);
router.get('/signout', controller.signOut);
router.get('/trades', controller.getUserTrades);
router.get('/watchlist', controller.getUserWatchlist);
router.get('/availableTrades', controller.getAvailableTrades);

module.exports = router;