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
  
  var errors = [];
  
  var idList = db.get('transactions').value()
                  .map(function(item) {
                    return item.id
                  });
  
  if(idList.indexOf(id) === -1){
    errors.push('id doesn not exsist');
  }
  
  if(errors.length){
    res.render('transactions/transactions',{
       errors: errors,
       trans: db.get('transactions').value()
    })
  }
  
  
  db.get('transactions').find({id: id})
    .assign({isCompleted: true})
    .write();
  res.redirect('/transactions')
}



