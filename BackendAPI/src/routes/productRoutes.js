const express = require('express');
const router = express.Router();
const { getProducts, getProductById } = require('../controllers/productController');

router.get('/:categoryname/products', getProducts);
router.get('/:categoryname/products/:productid', getProductById);

module.exports = router;
