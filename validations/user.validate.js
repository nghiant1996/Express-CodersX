module.exports.postCreate = function(req, res, next){
  var errors = [];
  
  var name = req.body.name;
  
  if(name.length > 30){
    errors.push('Name is longer than 30 chracters');
  }
  
  if(errors.length) {
    res.render('users/create',{
      errors: errors
    })
    return;
  }
  
  next();
}