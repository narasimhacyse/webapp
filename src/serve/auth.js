const userService = require('../service/service');
const db = require('../database/dbconfig');
const basicAuth = require('basic-auth');
const bcrypt = require('bcryptjs');
module.exports = authorize;

async function authorize (req,res,next){

  const data = basicAuth(req);
  let fetchid = req.params.userId;
  let productId = req.params.productId;
  if (!data || !data.name || !data.pass) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
     res.sendStatus(401);
     return; 
    }
   
  const user = await db.User.findOne({where:{username:data.name}});
  
  if(!user)
  {
    res.sendStatus(401);
    return;
  }

  if(fetchid && !(fetchid == user.id))
  {
    res.sendStatus(403);
    return;
  }
  if(productId)
  {
    const userData =  await database.User.findOne({ where: { username: data.name}});
    const product = await database.Product.findOne({ where: { id: productId } });
    if(!product){
      res.status(400).send({message:"This productID is not present in database"});
    return;
    }
    if(product.dataValues.owner_user_id != userData.dataValues.id)
    {
      res.status(403).send({message:"don't have access to this product"});
    }
  }


  if (!(await bcrypt.compare(data.pass, user.password)))
  {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return
  }

  req.a={};

  req.a.user = data;
  next()

}