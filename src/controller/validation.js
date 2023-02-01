const emailValidator = require('email-validator');

 function validateCreateUser(req, res, next) {
  if(!emailValidator.validate(req.body['username']) ){
    res.status(400);
    res.send({"error":'invalid email provided'});
    return;
  }
  if(!req.body['password'] || !req.body['first_name'] || !req.body['last_name'] ){
    res.status(400);
    res.send()
    return;
  }
  return next();
}

 function validateUpdateUser(req, res, next) {

  if(req.body['username'] ){
    res.status(400);
    res.send()
    return;
  }
  
  if(req.body['password'] && req.body['password'].trim().length <= 6){
    res.status(400);
    res.send()
    return;
  }

  if(req.body['first_name'] && req.body['first_name'].trim().length <= 0){
    res.status(400);
    res.send()
    return;
  }

  if(req.body['last_name'] && req.body['last_name'].trim().length <= 0){
    res.status(400);
    res.send()
    return;
  }

  if(req.body['updated_time'] || req.body['created_time']){
    res.status(400);
    res.send()
    return;
  }

  return next();
}

module.exports={
  validateCreateUser,
  validateUpdateUser
}