var express = require('express');
var shortid = require('shortid');
var db = require('../db.js');

var router = express.Router();

router.get('/',(req,res) => {
  res.render('transactions/transactions.pug',{
    trans: db.get('transactions').value()
  })
});

router.get('/create', (req,res) => {
 res.render('transactions/create', {
   users: db.get('users').value(),
   books: db.get('books').value()
 })
});

router.post('/create', (req,res) => {
 req.body.id = shortid.generate();
 db.get('transactions').push(req.body).write();
 res.redirect('/transactions')
  
});

module.exports = router;

