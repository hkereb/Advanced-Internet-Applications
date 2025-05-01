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

// Funkcja do aktualizacji ilości produktów
exports.updateQuantities = (cart, changes) => {
    Object.keys(changes).forEach(key => {
        if (key.startsWith('quantity_')) {
            const productId = key.split('_')[1];
            const newQuantity = parseInt(changes[key]);
            const product = cart.find(item => item.id == productId);
            if (product) {
                product.quantity = newQuantity;
            }
        }
    });
    return cart;
};
