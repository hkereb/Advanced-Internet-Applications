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

        res.redirect('/');
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

// Usuwanie produktu z koszyka – logika w service
exports.removeFromCart = (req, res) => {
    const productId = parseInt(req.body.id);
    const updatedCart = cartService.removeProductFromCart(productId, req.session.cart || []);
    req.session.cart = updatedCart;
    res.redirect('/cart');
};


// Aktualizacja ilości – logika w service
exports.updateQuantity = (req, res) => {
    const productId = parseInt(req.body.id);
    const newQuantity = parseInt(req.body.quantityToBuy);
    const updatedCart = cartService.updateProductQuantity(productId, newQuantity, req.session.cart || []);
    req.session.cart = updatedCart;
    res.redirect('/cart');
};

// Anulowanie koszyka
exports.cancelCart = (req, res) => {
    req.session.cart = [];
    res.redirect('/cart');
};

exports.finalizeOrder = async (req, res) => {
    const cart = req.session.cart || [];

    try {
        await cartService.finalizeOrder(cart);
        req.session.cart = [];  // Czyścimy koszyk po zaktualizowaniu
        res.redirect('/cart');
    } catch (error) {
        console.error('Błąd podczas finalizacji zamówienia:', error.message);
        res.status(500).send(`Błąd podczas finalizacji: ${error.message}`);
    }
};