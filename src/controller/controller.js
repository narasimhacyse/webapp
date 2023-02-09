const express = require('express');
const router = express.Router();

const authorize = require('../serve/auth.js')
const userService = require('../service/service');
const {validateCreateUser,validateUpdateUser,validateCreateProduct, validateUpdateProduct} = require('./validation');

module.exports = router;

router.get('/:userId',authorize,getUserData)
router.put('/:userId',authorize,validateUpdateUser,updateUserData);
router.post('/',validateCreateUser,createUser);

//product
router.post('/product', authorize, validateCreateProduct,createProduct);
router.get('/product/:productId', getProduct);
router.put('/product/:productId', authorize, validateCreateProduct, updateProduct);
router.delete('/product/:productId', authorize, deleteProduct);
router.patch('/product/:productId', authorize, validateUpdateProduct, patchProduct);

function createProduct(req,res,next){
  userService.createProduct(req,res)
  .then(data => {
    res.status(201);res.json(data)
  })
  .catch(data => {
    console.log("coming here2",data);
    res.status(400).send();next()
  });
}

function getProduct(req, res, next) {
  userService.getProduct(req.params.productId, req, req.body)
      .then(product => res.json(product))
      .catch(next => {
        res.status(400).send();
      });
}

function updateProduct(req,res,next){
  userService.updateProduct(req,res)
  .then(data => {
    res.status(201);res.json(data)
  })
  .catch(data => {
    res.status(400).send();next()
  });
}

function patchProduct(req,res,next){
  userService.patchProduct(req,res)
  .then(data => {
    res.status(201);res.json(data)
  })
  .catch(data => {
    res.status(400).send();next()
  });
}

function deleteProduct(req, res, next) {
  console.log("coming here");
  userService.deleteProduct(req.params.productId, req, res)
      .then(product => {
        res.status(204).json(product)
      })
      .catch(product => {
        res.status(400).send();
      });
}

function getUserData(req,res,next){
  const id = req.params.userId;

  userService.getUserData({
    username:req.a.user.name, 
    userId : id
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
    // console.log(data.id + " simha");
    res.status(201);res.json(data)
  })
  .catch(data => {
    res.status(400).send();next()
  });
}