const express = require('express');
const router = express.Router();

const bidcontrollers = require('../controllers/bid.controller')

router.get('/', bidcontrollers.getAllBid )
router.post('/', bidcontrollers.createBid )
router.get('/:id', bidcontrollers.getBidById)
router.put('/:id',bidcontrollers.updateBid )
router.delete('/:id', bidcontrollers.deleteBid),

module.exports = router