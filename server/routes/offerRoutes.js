const express = require('express');
const controller = require('../controllers/offerController');
const router = express.Router();

router.post('/create', controller.createOffer);
router.post('/accept', controller.acceptOffer);
router.post('/reject', controller.rejectOffer);
router.post('/cancel', controller.rejectOffer);
router.get('/show', controller.getOffers);
router.post('/showOffer', controller.getOffer);
module.exports = router;
