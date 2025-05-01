// cart/service.js
// Funkcja do obliczania całkowitej wartości koszyka
exports.calculateTotal = (cart) => {
    let total = 0;
    cart.forEach(item => {
        total += item.quantity * item.price;
    });
    return total;
};

// Usuwanie produktu z koszyka
exports.removeProductFromCart = (productId, sessionCart) => {
    return (sessionCart || []).filter(item => item.id !== productId);
};

// Aktualizacja ilości produktu w koszyku
exports.updateProductQuantity = (productId, newQuantity, sessionCart) => {
    const cart = sessionCart || [];

    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantityToBuy = newQuantity;
    }

    return cart;
};

// cartService.js
const productsModel = require('../products/model');  // Ścieżka do modelu produktów

// Metoda dodająca produkt do koszyka
exports.addProductToCart = async (productId, quantityToBuy, sessionCart) => {
    const product = await productsModel.getProductById(productId);  // Sprawdzenie, czy produkt istnieje

    if (!product) {
        throw new Error('Produkt nie istnieje.');  // Jeśli produkt nie istnieje, rzucamy wyjątek
    }

    let cart = sessionCart || [];  // Jeśli koszyk nie istnieje w sesji, tworzymy pusty

    // Sprawdzamy, czy produkt już jest w koszyku
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        // Jeśli produkt jest już w koszyku, aktualizujemy ilość
        existingProduct.quantity += quantityToBuy;
    } else {
        // Jeśli produkt nie ma w koszyku, dodajemy go
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

    return cart;  // Zwracamy zaktualizowany koszyk
};

exports.finalizeOrder = async (cart) => {
    for (const item of cart) {
        const product = await productsModel.getProductById(item.id);

        if (!product) {
            throw new Error(`Produkt o ID ${item.id} nie istnieje.`);
        }

        if (product.quantity < item.quantityToBuy) {
            throw new Error(`Produkt "${product.name}" ma tylko ${product.quantity} sztuk (żądano ${item.quantityToBuy}).`);
        }

        // Odejmujemy kupioną ilość z dostępnej
        const newQuantity = product.quantity - item.quantityToBuy;
        await productsModel.updateProductQuantity(item.id, newQuantity);
    }
};
