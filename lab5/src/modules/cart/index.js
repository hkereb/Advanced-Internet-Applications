// cart/index.js
const express = require('express');
const router = express.Router();
const cartController = require('./controller');

// Trasa GET dla widoku koszyka
router.get('/', cartController.viewCart);

// Dodawanie produktu do koszyka
router.post('/remove-product', cartController.removeFromCart);

// Dodawanie produktu do koszyka
router.post('/add-to-cart', cartController.addToCart);

// Aktualizacja ilości produktów w koszyku
router.post('/update-quantity', cartController.updateQuantity);

// Anulowanie koszyka
router.post('/cancel-cart', cartController.cancelCart);

// Finalizacja zamówienia
router.post('/finalize-order', cartController.finalizeOrder);


module.exports = router;