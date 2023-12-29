const express = require('express');
const router = express.Router();

const Orderscontrollers = require('../controllers/orders.controller')

router.get('/', Orderscontrollers.getAllOrders )
router.post('/', Orderscontrollers.createOrders)
router.get('/:id', Orderscontrollers.getOrdersById )
router.put('/:id', Orderscontrollers.updateOrders)
router.delete('/:id', Orderscontrollers.deleteOrders),

module.exports = router