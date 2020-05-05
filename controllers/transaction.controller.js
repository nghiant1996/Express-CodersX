var db = require('../db.js');
var shortid = require('shortid');

module.exports.index = (req,res) => {
  res.render('transactions/transactions.pug',{
    trans: db.get('transactions').value()
  })
};

module.exports.create = (req,res) => {
 res.render('transactions/create', {
   users: db.get('users').value(),
   books: db.get('books').value()
 })
};

module.exports.postCreate = (req,res) => {
 req.body.id = shortid.generate();
 req.body.isCompleted = false;
 db.get('transactions').push(req.body).write();
 res.redirect('/transactions');
}; 

module.exports.complete = (req,res) => {
  var id = req.params.id;
  db.get('transactions').find({id: id})
    .assign({isCompleted: true})
    .write();
  res.redirect('/transactions')
}



