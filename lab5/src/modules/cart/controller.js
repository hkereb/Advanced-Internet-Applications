// cart/controller.js
const cartService = require('./service');
const productsModel = require('../products/model');  // Importujemy model produktów, by pobierać je z bazy danych

// Dodawanie produktu do koszyka
exports.addToCart = async (req, res) => {
    const productId = req.body.id;
    const quantity = parseInt(req.body.quantity) || 1;  // Ilość, domyślnie 1

    try {
        console.log('req.body:', req.body);
        // Wywołanie metody z serwisu
        const updatedCart = await cartService.addProductToCart(productId, quantity, req.session.cart);

        // Zapisanie zaktualizowanego koszyka w sesji
        req.session.cart = updatedCart;

        console.log(`Zaktualizowano koszyk. Liczba produktów w koszyku: ${updatedCart.length}`);

        res.redirect('/cart');
    } catch (error) {
        console.error('Błąd podczas dodawania produktu do koszyka:', error);
        res.status(500).send('Wystąpił błąd podczas dodawania produktu do koszyka.');
    }
};

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
