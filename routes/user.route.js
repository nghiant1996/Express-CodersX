var express = require('express');
var shortid = require('shortid');
var db = require('../db.js');

var router = express.Router();
var controller = require('../controllers/user.controller.js');

router.get('/', controller.index);
//Create 

router.get('/create', controller.create);

router.post('/create', controller.postCreate);

//Delete

router.get('/delete/:id', controller.delete);

//Update

router.get('/update/:id', controller.update);

router.post('/update', controller.postUpdate);

//
module.exports = router;

