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

// Usuwanie produktu z koszyka
exports.removeFromCart = (req, res) => {
    const productId = parseInt(req.body.id);
    let cart = req.session.cart || [];

    console.log('Koszyk przed usunięciem:', cart);

    // Usuwamy produkt z koszyka
    cart = cart.filter(item => item.id !== productId);
    req.session.cart = cart;

    console.log('Koszyk po usunięciu:', cart);

    res.redirect('/cart');
};

exports.updateQuantity = (req, res) => {
    const productId = parseInt(req.body.id);
    const newQuantity = parseInt(req.body.quantityToBuy);
    let cart = req.session.cart || [];

    console.log('Dane przed aktualizacją:');
    console.log('productId:', productId);
    console.log('newQuantity:', newQuantity);

    console.log('Koszyk przed aktualizacją:', cart);

    // Znajdź produkt i zaktualizuj jego ilość
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantityToBuy = newQuantity;
        console.log(`Zaktualizowano ilość produktu ${productId}: ${newQuantity}`);
    } else {
        console.log(`Nie znaleziono produktu o id ${productId}`);
    }

    req.session.cart = cart;

    console.log('Koszyk po aktualizacji:', cart);

    res.redirect('/cart');
};

// Anulowanie koszyka
exports.cancelCart = (req, res) => {
    req.session.cart = [];
    res.redirect('/cart');
};

// Finalizacja zamówienia
exports.finalizeOrder = (req, res) => {
    console.log('Finalizowanie zamówienia...');
    req.session.cart = [];
    res.redirect('/cart');
};