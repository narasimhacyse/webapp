const userService = require('../service/service');
const db = require('../database/dbconfig');
const basicAuth = require('basic-auth');
const bcrypt = require('bcryptjs');
module.exports = authorize;

async function authorize (req,res,next){

  const data = basicAuth(req);
  let fetchid = req.params.userId;
  
  if (!data || !data.name || !data.pass) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
     res.sendStatus(401);
     return; 
    }
   
  const user = await db.User.findOne({where:{username:data.name}});
  
  // console.log(user.id + " narasimha");
  if(!user)
  {
    console.log("coming here");
    res.sendStatus(401);
    return;
  }

  if(!(fetchid == user.id))
  {
    res.sendStatus(403);
    return;
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