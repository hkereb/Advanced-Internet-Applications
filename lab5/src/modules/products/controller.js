const productModel = require("./model");

exports.showAllProducts = async (req, res) => {
  try {
    const products = await productModel.getAllProducts();
    res.render("index", { products, cart: req.session.cart || [], message: req.session.message || null });
    req.session.message = null;
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading products.");
  }
};

exports.showProductDetails = async (req, res) => {
  try {
    const product = await productModel.getProductById(req.params.id);

    if (!product) {
      return res.status(404).send("Error, product not found");
    }

    res.render('details', { product, cart: req.session.cart || [] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error, can't get product details");
  }
};
