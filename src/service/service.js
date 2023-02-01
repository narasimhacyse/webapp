const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const database = require('../database/dbconfig');

async function  createUser(user) {

  await database.initialize();
  const userData = await database.User.findOne({ where: { username: user.username } })
  if (userData) {
    return user.username + " already exists";
    // return;
  }
  if (user.password) {
    user.hash = await bcrypt.hash(user.password, 10);
  }
  user.id = uuid.v4();

  let mod_date = new Date().toISOString().slice(0, 19).replace('T', ' ');

  user.created_time = mod_date;
  user.updated_time = mod_date;
  user.password = user.hash;

  await database.User.create(user);

  const ans = await database.User.findOne({ where: { username: user.username } })
  details = {};
  details.id = ans.id;
  details.username = ans.username;
  details.first_name = ans.first_name;
  details.last_name = ans.last_name;
  details.created_time = ans.created_time;
  details.updated_time = ans.updated_time;

  return details;
}

async function updateUser(data,user){

  let userData = await database.User.findOne({ where: { username: user.name } })
  if (!userData) {
    return user.username + " user not exists"; 
  }
  userData = userData.dataValues
  if (data.password) {
    userData.password = await bcrypt.hash(data.password, 10);
  }
  if(data.created_time){
    delete user.created_time;
  }

  if(data.updated_time){
    delete user.updated_time;
  }
  if(data.first_name){
    userData.first_name = data.first_name
  }
  if(data.last_name){
    userData.last_name = data.last_name
  }
  let mod_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  userData.updated_time = mod_date
  database.User.update({password:userData.password,
                  first_name:userData.first_name,
                  last_name:userData.last_name,
                  updated_time:userData.updated_time
                  },{where:{username:user.name}})

}

async function getUserData({username}){
  const data = await database.User.findOne({ where: { username: username } });
  details = {};
  details.id = data.dataValues.id;
  details.username = data.dataValues.username;
  details.first_name = data.dataValues.first_name;
  details.last_name = data.dataValues.last_name;
  details.created_time = data.dataValues.created_time;
  details.updated_time = data.dataValues.updated_time;
  return details;
}

module.exports = {
  getUserData,
  updateUser,
  createUser
}