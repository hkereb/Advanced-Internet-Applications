const express = require('express');
const router = express.Router();
const controller = require('./controller');

// main page
router.get('/', controller.showAllProducts);

// product details
router.get('/product/:id', controller.showProductDetails);

module.exports = router;
