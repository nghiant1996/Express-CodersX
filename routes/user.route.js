var express = require('express');
var shortid = require('shortid');
var db = require('../db.js');

var router = express.Router();

router.get('/',(req,res) => {
  res.render('users/users.pug', {
    users: db.get('users').value()
  })
});

//Create 

router.get('/create', (req,res) => {
  res.render('users/create')
});

router.post('/create', (req,res) => {
  req.body.id = shortid.generate();
  db.get('users').push(req.body).write();
  res.redirect('/users');
});

//Delete

router.get('/delete/:id', (req,res) => {
  var id = req.params.id;
  db.get('users').remove({id: id}).write();
  res.redirect('/users');
});

//Update

router.get('/update/:id', (req,res) => {
  var id = req.params.id;
  res.render('users/update',{
    id: id
  })
  
});

router.post('/update', (req,res) => {
  var id = req.body.id;
  var newName = req.body.newName;
  
  db.get('users').find({id: id}).assign({name: newName}).write();
  
  res.redirect('/users')
  
})





module.exports = router;

