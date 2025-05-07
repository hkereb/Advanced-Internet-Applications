const cartService = require('./service');

exports.addToCart = async (req, res) => {
    const productId = req.body.id;
    const quantity = parseInt(req.body.quantity) || 1; 

    try {
        console.log('req.body:', req.body);
        const updatedCart = await cartService.addProductToCart(productId, quantity, req.session.cart);

        req.session.cart = updatedCart;

        console.log(`Cart updated`);

        res.redirect('/');
    } catch (error) {
        console.error("Error, can't add product to cart:", error);
        res.status(500).send("Error, can't add product to cart");
    }
};

exports.viewCart = (req, res) => {
    const cart = req.session.cart || [];
    const total = cartService.calculateTotal(cart);
    res.render('cart', { cart, total });
};


exports.removeFromCart = (req, res) => {
    const productId = parseInt(req.body.id);
    const updatedCart = cartService.removeProductFromCart(productId, req.session.cart || []);
    req.session.cart = updatedCart;
    res.redirect('/cart');
};

exports.updateQuantity = (req, res) => {
    const productId = parseInt(req.body.id);
    const newQuantity = parseInt(req.body.quantityToBuy);
    const updatedCart = cartService.updateProductQuantity(productId, newQuantity, req.session.cart || []);
    req.session.cart = updatedCart;
    res.redirect('/cart');
};

exports.cancelCart = (req, res) => {
    req.session.cart = [];
    res.redirect('/cart');
};

exports.finalizeOrder = async (req, res) => {
    const cart = req.session.cart || [];

    try {
        await cartService.finalizeOrder(cart);
        req.session.cart = []; 
        res.redirect('/cart');
    } catch (error) {
        console.error("Error, can't finalize order", error.message);
        res.status(500).send("Error, can't finalize order: ${error.message}");
    }
};