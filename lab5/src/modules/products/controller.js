const productModel = require("./model");

exports.showAllProducts = async (req, res) => {
  try {
    const products = await productModel.getAllProducts();
    res.render("index", { products, message: req.session.message || null });
    req.session.message = null;
  } catch (err) {
    res.status(500).send("Error loading products.");
  }
};