// src/modules/product/model.js
const db = require("../../db");

exports.getAllProducts = async () => {
  try {
    const [rows] = await db.query("SELECT * FROM products");

    // Konwertowanie ceny na liczbę, jeśli nie jest już liczbą
    rows.forEach(product => {
        product.price = parseFloat(product.price);  // Upewniamy się, że price to liczba
    });

    return rows; // Zwrócenie wyników
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err; // Jeśli wystąpi błąd, rzucamy go
  }
};

// Funkcja pobierająca produkt po ID
exports.getProductById = async (id) => {
    try {
        // Wykonanie zapytania w MySQL
        const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [id]);

        // Zwracamy pierwszy wynik (jeśli istnieje)
        return rows[0] || null;  // Jeśli nie ma takiego produktu, zwróci null
    } catch (error) {
        console.error(error);
        return null;
    }
};