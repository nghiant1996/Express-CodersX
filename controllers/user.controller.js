var db = require('../db.js');
var shortid = require('shortid');
var cloudinary = require('cloudinary').v2;


cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET
});


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
  console.log(id);
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

module.exports.profile = (req,res) => {
  var id = req.params.id;
  var user = db.get('users').find({id: id}).value();
  res.render('users/profile.pug', {
    user: user
  })
}

module.exports.avatar = (req, res) => {
  var id = req.params.id;
  var user = db.get('users').find({id: id}).value();
  res.render('users/avatar.pug', {
    user: user
  })
}

module.exports.postAvatar = (req,res) => {
  var path = req.file.path;
  var id = req.params.id;
  cloudinary.uploader.upload(path, function(error, result) { 
    db.get('users').find({id: id})
    .assign({avatar: result.url}).write();
    
    var user = db.get('users').find({id: id}).value();
    console.log(user)
    
    res.render('users/profile',{
      user: user
    })
  });
}