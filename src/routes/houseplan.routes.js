const express = require('express');
const router = express.Router();

const houseplancontrollers = require('../controllers/houseplan.controller')

router.get('/', houseplancontrollers.getAllHouseplan )
router.post('/', houseplancontrollers.createHouseplan )
router.get('/:id', houseplancontrollers.getHouseplanById)
router.put('/:id', houseplancontrollers.updateHouseplan )
router.delete('/:id', houseplancontrollers.deleteHouseplan),

module.exports = router