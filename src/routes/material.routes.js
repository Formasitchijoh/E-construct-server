const express = require('express');
const router = express.Router();

const materialController = require('../controllers/material.controller')

router.get('/', materialController.findAll)

router.post('/', materialController.createMaterial)

router.get('/:id', materialController.findById)

router.put('/:id', materialController.updateMaterial)

router.delete('/:id', materialController.deleteMaterial)

router.get('/project/:id', materialController.materialCostForProject)


module.exports = router