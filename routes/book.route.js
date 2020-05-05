var express = require('express');
var controller = require('../controllers/book.controller.js')

var router = express.Router();

router.get('/', controller.index);

router.get('/create', controller.create);

router.post('/create', controller.postCreate);

router.get('/delete/:id', controller.delete);

router.get('/update/:id', controller.update);

router.post('/update', controller.postUpdate);

module.exports = router;
