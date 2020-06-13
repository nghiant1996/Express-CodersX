var db = require('../db.js');
var shortid = require('shortid');

module.exports.index = (req, res) => {
  console.log()
  
  var page = parseInt(req.query.page) || 1;
  
  var perPage = 6;
  var drop = (page - 1)*perPage;
  //drop trong thu vien Lodash
  var results = {};
  results.result = db.get('books')
                     .drop(drop)
                     .take(perPage)
                     .value();
  results.previous = {
    page: page - 1
  };
  
  results.next = {
    page: page + 1
  };
  
  results.numberPages = [results.previous.page + 1, results.previous.page + 2, results.previous.page + 3]
  
  res.render('books/books',{
    books: results.result,
    pre: results.previous.page,
    next: results.next.page,
    numberPages: results.numberPages
    
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

