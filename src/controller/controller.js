const express = require('express');
const router = express.Router();

const authorize = require('../serve/auth.js')
const userService = require('../service/service');
const {validateCreateUser,validateUpdateUser} = require('./validation');


router.get('/self',authorize,getUserData)
router.put('/self',authorize,validateUpdateUser,updateUserData);
router.post('/',validateCreateUser,createUser);

module.exports = router;

function getUserData(req,res,next){
  userService.getUserData({
    username:req.a.user.name
  })
  .then(data => res.json(data))
  .catch(next)
}

function updateUserData(req,res,next){
  userService.updateUser(req.body,req.a.user)
  .then(data => {
    res.status(204);res.json(data)
  })
  .catch(next)
}

function createUser(req,res,next){
  userService.createUser(req.body)
  .then(data => {
    res.status(201);res.json(data)
  })
  .catch(data => {
    res.sendStatus(400);next()
  });
}