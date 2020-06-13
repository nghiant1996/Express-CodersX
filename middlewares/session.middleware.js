var shortid = require('shortid');
var db = require('../db');

module.exports = function(req, res, next){
  var sessionId = shortid.generate();
  

  if(req.signedCookies.userId){
    var user = db.get('users').find({id: req.signedCookies.userId}).value()
    if(user){
      res.locals.user = user
    }
  }
  
  // res.clearCookie('sessionId');
  // console.log(req.signedCookies.sessionId)
  
  if(!req.signedCookies.sessionId){
    res.cookie('sessionId', sessionId, {
      signed: true
    });
    
    db.get('sessions').push({
      id: sessionId
    }).write()
  }

  // console.log(sessionId)
  // console.log(req.signedCookies.sessionId)
  
  var currentSession = db.get('sessions').find({id: req.signedCookies.sessionId}).value();  
  var cartCount = 0;

  if(currentSession){
    var selectedProducts = currentSession.cart;
    for(var product in selectedProducts){
      cartCount += selectedProducts[product];
    }
  }
  
  res.locals.cartCount = cartCount;
  
  next();
  
}