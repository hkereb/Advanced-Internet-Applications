const db = require("../../db");

exports.getAllProducts = async () => {
  try {
    const [rows] = await db.query("SELECT * FROM products");

    rows.forEach(product => {
        product.price = parseFloat(product.price); 
    });

    return rows; 
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err; 
  }
};

exports.getProductById = async (id) => {
    try {
        const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [id]);

        return rows[0] || null; 
    } catch (error) {
        console.error(error);
        return null;
    }
};

exports.updateProductQuantity = async (productId, newQuantity) => {
    const sql = 'UPDATE products SET quantity = ? WHERE id = ?';
    await db.query(sql, [newQuantity, productId]);
};