// src/modules/product/index.js
const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/", controller.showAllProducts);

module.exports = router;