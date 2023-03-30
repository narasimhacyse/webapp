const emailValidator = require('email-validator');
const logger = require('../logs/logs');

 function validateCreateUser(req, res, next) {
  if(!emailValidator.validate(req.body['username']) ){
    res.status(400);
    logger.error("invalid email provided");
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

  if(!req.body['username'] ){
    res.status(400);
    logger.error("please provide username");
    res.send({message:"please provide username"});
    return;
  }else{
    const authuser = req.a.user.name;
    if(req.body.username != authuser)
    {
      logger.error("username should be same");
      res.status(400).send({message:"username should be same"});
      return;
    }
  }
  
  if(!(req.body['password'])){
    res.status(400);
    logger.error("please provide password");
    res.send({message:"please provide password"})
    return;
  }

  if(!(req.body['first_name'])){
    res.status(400);
    logger.error("please provide firstname");
    res.send({message:"please provide firstname"});
    return;
  }

  if(!(req.body['last_name'])){
    res.status(400);
    logger.error("please provide lastname");
    res.send({message:"please provide lastname"})
    return;
  }

  next();
}

function validateCreateProduct(req,res,next){
  if(!(req.body['name'] && typeof req.body.name == "string") ||
  !(req.body['description'] && typeof req.body.description == "string") || 
  !(req.body['sku'] && typeof req.body.sku == "string")|| 
  !(req.body['manufacturer'] && typeof req.body.manufacturer == "string") ){
    res.status(400);
    res.send()
    return;
  }

  if(req.body['date_added'] || req.body['date_last_updated'] || req.body['owner_user_id']){
    res.status(400);
    res.send()
    return;
  }

  return next();
}

function validateUpdateProduct(req,res,next){
  
if(req.body['name']){
  if(typeof req.body.name != "string") {
    res.status(400);
    res.send()
    return;
  }
}

if(req.body['description']){
  if(typeof req.body.description != "string") {
    res.status(400);
    res.send()
    return;
  }
}

if(req.body['sku']){
  if(typeof req.body.sku != "string") {
    res.status(400);
    res.send()
    return;
  }
}

if(req.body['manufacturer']){
  if(typeof req.body.manufacturer != "string") {
    res.status(400);
    res.send()
    return;
  }
}

  return next();
}

module.exports={
  validateCreateUser,
  validateUpdateUser,
  validateCreateProduct,
  validateUpdateProduct
}