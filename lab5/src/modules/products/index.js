const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/', controller.showAllProducts);

router.get('/product/:id', controller.showProductDetails);

module.exports = router;
