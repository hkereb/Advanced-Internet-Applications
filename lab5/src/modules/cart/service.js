// cart/service.js
// Funkcja do obliczania całkowitej wartości koszyka
exports.calculateTotal = (cart) => {
    let total = 0;
    cart.forEach(item => {
        total += item.quantity * item.price;
    });
    return total;
};

// Funkcja do usuwania produktów z koszyka
exports.removeProducts = (cart, changes) => {
    Object.keys(changes).forEach(key => {
        if (key.startsWith('remove_')) {
            const productId = key.split('_')[1];
            cart = cart.filter(item => item.id != productId);
        }
    });
    return cart;
};

exports.updateQuantities = (cart, changes) => {
    Object.keys(changes).forEach(key => {
        if (key.startsWith('quantity_')) {
            const productId = key.split('_')[1];
            const newQuantity = parseInt(changes[key]);
            const product = cart.find(item => item.id == productId);
            if (product) {
                product.quantity = newQuantity;  // Upewnij się, że ta linia zmienia ilość produktu
            }
        }
    });
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