// modules/products/index.js
const express = require('express');
const router = express.Router();
const db = require('../../db'); // zakładam, że plik db.js jest w głównym katalogu

// Strona główna – lista produktów
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products");

    // Zamieniamy price na liczbę (dla każdego produktu)
    const products = rows.map(product => ({
        ...product,
        price: parseFloat(product.price)
    }));

    res.render('index', { products, cart: req.session.cart || [] });
  } catch (err) {
    console.error(err);
    res.status(500).send('Błąd podczas pobierania produktów');
  }
});

// 👇 Nowa trasa do szczegółów produktu
router.get('/product/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [productId]);

    if (rows.length === 0) {
      return res.status(404).send('Produkt nie znaleziony');
    }

    const product = rows[0];
    res.render('details', { product, cart: req.session.cart || [] });
  } catch (err) {
    console.error(err);
    res.status(500).send('Błąd podczas pobierania szczegółów produktu');
  }
});

module.exports = router;
