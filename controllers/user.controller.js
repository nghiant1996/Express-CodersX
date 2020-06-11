var db = require('../db.js');
var shortid = require('shortid');

module.exports.index = (req,res) => {
  res.render('users/users.pug', {
    users: db.get('users').value()
  })
};

module.exports.create = (req,res) => {
  res.render('users/create')
};

module.exports.postCreate = (req,res) => {
  req.body.id = shortid.generate();
  req.body.password = '123123';
  
  var email = req.body.email;
  
  var user = db.get('users').find({email: email}).value();
  
  if(user){
    res.render('users/create', {
      errors:[
        'User already exists with this email'
      ],
      values: req.body
    })
    return
  }
  
  db.get('users').push(req.body).write();
  res.redirect('/users');
};

module.exports.delete = (req,res) => {
  var id = req.params.id;
  db.get('users').remove({id: id}).write();
  res.redirect('/users');
};

module.exports.update = (req,res) => {
  var id = req.params.id;
  res.render('users/update',{
    id: id
  }) 
};

module.exports.postUpdate = (req,res) => {
  var id = req.body.id;
  var newName = req.body.newName;
  
  db.get('users').find({id: id}).assign({name: newName}).write();
  
  res.redirect('/users')
  
};
