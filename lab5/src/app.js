const db = require('./db');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const productsRouter = require('./modules/products');
const cartRouter = require('./modules/cart');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views')); 

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'public'))); 

app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}));

app.use((req, res, next) => {
  res.locals.message = req.session.message || null;
  delete req.session.message;
  next();
});

app.use('/', productsRouter);
app.use('/cart', cartRouter);

module.exports = app;