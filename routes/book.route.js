var express = require('express');
var db = require('../db.js');
var shortid = require('shortid');

var router = express.Router();

router.get('/', (req, res) => {
  res.render('books/books',{
    books: db.get('books').value()
  })
});

router.get('/create', (req,res) => {
  res.render('books/create');
});

router.post('/create', (req,res) => {
  req.body.id = shortid.generate();
  db.get('books')
    .push(req.body)
    .write();
  res.redirect('/books');
});

router.get('/delete/:id', (req, res) => {
  var id = req.params.id;
  db.get('books')
    .remove({id: id})
    .write()
  res.redirect('/books')
})

router.get('/update/:id', (req,res) => {
  var id = req.params.id;
  res.render('books/update', {
    id: id
  });  
})

router.post('/update', (req,res) => {
  var id = req.body.id;
  var newTitle = req.body.newTitle;
  db.get('books')
    .find({id: id})
    .assign({title: newTitle})
    .write()
  res.redirect('/books');
  // console.log(req.body)
});

module.exports = router;
