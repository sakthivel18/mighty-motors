const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.post('/login', controller.login);
router.post('/signup', controller.signup);
router.get('/hasLoggedIn', controller.hasLoggedIn);
router.get('/signout', controller.signOut);
router.get('/trades', controller.getUserTrades);
router.get('/watchlist', controller.getUserWatchlist);
router.get('/availableTrades', controller.getAvailableTrades);

module.exports = router;