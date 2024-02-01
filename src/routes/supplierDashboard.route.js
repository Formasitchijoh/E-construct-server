const express = require('express')

const router = express.Router();
const supplierDashboardController = require('../controllers/supplierDashboard.Controller') 


router.get('/:supplierId', supplierDashboardController.getAllMaterials)
router.post('/:supplierId', supplierDashboardController.createMaterial)
router.put('/', supplierDashboardController.updateMaterial)

module.exports = router