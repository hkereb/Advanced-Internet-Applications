const express = require('express');
const router = express.Router();

// przykładowa trasa
router.get('/', (req, res) => {
  res.send('Cart endpoint');
});

module.exports = router;
