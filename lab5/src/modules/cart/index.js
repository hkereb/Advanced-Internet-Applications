const express = require('express');
const router = express.Router();
const cartController = require('./controller');

router.get('/', cartController.viewCart);

router.post('/remove-product', cartController.removeFromCart);

router.post('/add-to-cart', cartController.addToCart);

router.post('/update-quantity', cartController.updateQuantity);

router.post('/cancel-cart', cartController.cancelCart);

router.post('/finalize-order', cartController.finalizeOrder);

module.exports = router;