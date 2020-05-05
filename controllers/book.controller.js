var db = require('../db.js');
var shortid = require('shortid');

module.exports.index = (req, res) => {
  res.render('books/books',{
    books: db.get('books').value()
  })
};

module.exports.create = (req,res) => {
  res.render('books/create');
};

module.exports.postCreate = (req,res) => {
  req.body.id = shortid.generate();
  db.get('books')
    .push(req.body)
    .write();
  res.redirect('/books');
};

module.exports.delete = (req, res) => {
  var id = req.params.id;
  db.get('books')
    .remove({id: id})
    .write()
  res.redirect('/books')
};

module.exports.update = (req,res) => {
  var id = req.params.id;
  res.render('books/update', {
    id: id
  });  
};

module.exports.postUpdate = (req,res) => {
  var id = req.body.id;
  var newTitle = req.body.newTitle;
  db.get('books')
    .find({id: id})
    .assign({title: newTitle})
    .write()
  res.redirect('/books');
  // console.log(req.body)
};

