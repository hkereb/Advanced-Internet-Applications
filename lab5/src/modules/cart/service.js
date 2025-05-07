const productsService = require('../products/service'); 

exports.calculateTotal = (cart) => {
    let total = 0;
    cart.forEach(item => {
        total += item.quantity * item.price;
    });
    return total;
};

exports.removeProductFromCart = (productId, sessionCart) => {
    return (sessionCart || []).filter(item => item.id !== productId);
};

exports.updateProductQuantity = (productId, newQuantity, sessionCart) => {
    const cart = sessionCart || [];

    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantityToBuy = newQuantity;
    }

    return cart;
};

exports.addProductToCart = async (productId, quantityToBuy, sessionCart) => {
    const product = await productsService.getProductById(productId); 

    if (!product) {
        throw new Error('Error product not found'); 
    }

    let cart = sessionCart || []; 

    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += quantityToBuy;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            image: product.image,
            description: product.description,
            price: product.price,
            quantity: product.quantity,
            quantityToBuy: quantityToBuy
        });
    }

    return cart; 
};

exports.finalizeOrder = async (cart) => {
    for (const item of cart) {
        const product = await productsService.getProductById(item.id);

        if (!product) {
            throw new Error(`Product with id ${item.id} not found`);
        }

        if (product.quantity < item.quantityToBuy) {
            throw new Error(`Product "${product.name}" has ${product.quantity} units in stock, while ${item.quantityToBuy} units was requested.`);
        }

        const newQuantity = product.quantity - item.quantityToBuy;
        await productsService.updateProductQuantity(item.id, newQuantity);
    }
};
