var db = require('../db.js');
var md5 = require('md5');

var bcrypt = require('bcrypt');
var saltRounds = 10;

module.exports.login = function(req,res){
  res.render('auth/login');
}

module.exports.postLogin = function(req,res){
  var email = req.body.email;
  var password = req.body.password;
  
  var user = db.get("users").find({email: email}).value();
  
  if(!user){
    res.render('auth/login',{
      errors: [
        'User does not exsist'
      ],
      values: req.body
    });
    return
  }
  
  // var hashedPassword = md5(password);
  
  var check = bcrypt.compareSync(password, user.password)      
  
  if(check === false){
        res.render('auth/login',{
        errors: [
          'Wrong password'
        ],
        values: req.body
        });
        return
  }
  
    
  res.cookie('userId', user.id, {
    signed: true
  });
  res.redirect('/users');
  
  
}

