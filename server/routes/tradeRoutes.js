const express = require('express');
const controller = require('../controllers/tradeController');
const router = express.Router();

// GET - Returns all trades
router.get('/', controller.findAll);

// GET - Returns all category names
router.get('/categories', controller.findAllCategories);

// GET - Returns a trade with given id
router.get('/:id', controller.findById);

// POST - creates and returns a trade
router.post('/create', controller.create);

// PUT - updates and returns a trade
router.put('/:id', controller.update);

// DELETE - deletes a trade
router.delete('/:id', controller.delete);

// GET - watch or unwatch a movie
router.get('/watchlist/:id', controller.watchUnwatchMovie);

module.exports = router;
