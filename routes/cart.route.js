var express = require('express');
var controller = require('../controllers/cart.controller.js')

var router = express.Router();

router.get('/add/:bookId', controller.addToCart);

module.exports = router;