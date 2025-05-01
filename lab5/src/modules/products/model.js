// src/modules/product/model.js
const db = require("../../db");

exports.getAllProducts = async () => {
  try {
    const [rows] = await db.query("SELECT * FROM products");
    return rows; // Zwrócenie wyników
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err; // Jeśli wystąpi błąd, rzucamy go
  }
};