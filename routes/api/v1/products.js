const express = require('express');
const router = express.Router();
const productAPI = require('../../../controllers/api/v1/productController');

router.post('/create', productAPI.createProduct);
router.get('/', productAPI.listProducts);
router.delete('/:id', productAPI.deleteProduct);
router.patch('/:id/update_quantity', productAPI.updateQuantity);

module.exports = router;
