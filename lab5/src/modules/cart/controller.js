// cart/controller.js
const cartService = require('./service');

exports.viewCart = (req, res) => {
    const cart = req.session.cart || [];
    const total = cartService.calculateTotal(cart);
    res.render('cart', { cart, total });
};

exports.updateCart = (req, res) => {
    const { action, ...changes } = req.body;
    let cart = req.session.cart || [];

    // Przetwarzanie akcji
    if (action === 'cancel') {
        cart = [];
    } else if (action === 'finalize') {
        // Zrealizuj zamówienie
        console.log('Finalizowanie zamówienia...');
        cart = [];
    }

    // Przetwarzanie usuwania produktów
    cart = cartService.removeProducts(cart, changes);

    // Przetwarzanie zmiany ilości produktów
    cart = cartService.updateQuantities(cart, changes);

    req.session.cart = cart;
    res.redirect('/cart');
};
