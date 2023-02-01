const userService = require('../service/service');
const db = require('../database/dbconfig');
const basicAuth = require('basic-auth');
const bcrypt = require('bcryptjs');
module.exports = authorize;

async function authorize (req,res,next){

  const data = basicAuth(req);
  
  if (!data || !data.name || !data.pass) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
     res.sendStatus(401);
     return; 
    }

  const user = await db.User.findOne({where:{username:data.name}})
  if(!user)
  {
    res.sendStatus(401);
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