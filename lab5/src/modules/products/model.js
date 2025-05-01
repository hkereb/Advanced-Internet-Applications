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