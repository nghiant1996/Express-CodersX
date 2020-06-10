var db = require('../db')
module.exports.requireAuth= (req, res, next)=>{
  if(!req.signedCookies.userId ){
    res.redirect('/auth/login');
    return;
  }
  var user = db.get('users')
               .find({id : req.signedCookies.userId}).value();
  
  if(!user){
    res.redirect('/auth/login');
    return;
  }
  
  res.locals.user = user // de luu bien user, them ten nguoi dung vao goc ph
  //phai man hinh(truyen vao trong view)
  next();
}

// module.exports.verifyAdmin= (req,res,next)=>{
//   var user = db.get('user').find({id: req.cookies.userId}).value();
//   if(user.isAdmin === true){
    
//   }
              
// }