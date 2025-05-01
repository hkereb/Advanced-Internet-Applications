// cart/index.js
const express = require('express');
const router = express.Router();
const cartController = require('./controller');

// Trasa GET dla widoku koszyka
router.get('/', cartController.viewCart);

// Trasa POST do aktualizacji koszyka
router.post('/update-cart', cartController.updateCart);

// Dodawanie produktu do koszyka
router.post('/add-to-cart', cartController.addToCart);

module.exports = router;