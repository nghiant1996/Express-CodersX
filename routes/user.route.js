var express = require('express');
var multer  = require('multer');
var shortid = require('shortid');
var db = require('../db.js');

var controller = require('../controllers/user.controller.js');
var validate = require('../validations/user.validate.js');

var upload = multer({ dest: './public/uploads/' });

var router = express.Router();

// var authMiddleware = require('../middlewares/auth.middleware.js');

router.get('/', controller.index);
//Create 

router.get('/create', controller.create);

router.post('/create', validate.postCreate, controller.postCreate);

//Delete

router.get('/delete/:id', controller.delete);

//Update

router.get('/update/:id', controller.update);

router.post('/update', controller.postUpdate);


router.get('/profile/:id', controller.profile);

router.get('/profile/avatar/:id', controller.avatar);

router.post('/profile/avatar/:id', upload.single('avatar'), controller.postAvatar);


//
module.exports = router;

