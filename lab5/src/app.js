const db = require('./db');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

// Moduły
const productsRouter = require('./modules/products');
const cartRouter = require('./modules/cart');

const app = express();

// Konfiguracja EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));  // Poprawna ścieżka do folderu views

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'public')));  // Używamy '..' żeby wrócić o jeden poziom wyżej

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Konfiguracja sesji
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}));

// Komunikaty globalne (dla layoutu)
app.use((req, res, next) => {
  res.locals.message = req.session.message || null;
  delete req.session.message;
  next();
});

// Trasy
app.use('/', productsRouter);
app.use('/cart', cartRouter);

module.exports = app;