const express = require('express');
const router = express.Router();

const authorize = require('../serve/auth.js')
const userService = require('../service/service');
const {validateCreateUser,validateUpdateUser,validateCreateProduct, validateUpdateProduct} = require('./validation');

// Create a multer middleware to handle file upload
const multer = require('multer');
const filter = (req,file, cb)=>{
  if(file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png" )
    {
        cb(null,true);
    }
    else{
        cb(null, false);
    }
}
const upload = multer({
  // storage: multer.memoryStorage(),
  fileFilter: filter
});


module.exports = router;

router.get('/user/:userId',authorize,getUserData)
router.put('/user/:userId',authorize,validateUpdateUser,updateUserData);
router.post('/user/',validateCreateUser,createUser);

//product
router.post('/product', authorize, validateCreateProduct,createProduct);
router.get('/product/:productId', getProduct);
router.put('/product/:productId', authorize, validateCreateProduct, updateProduct);
router.delete('/product/:productId', authorize, deleteProduct);
router.patch('/product/:productId', authorize, validateUpdateProduct, patchProduct);

// image
router.post('/product/:productId/image',upload.single('upload'),authorize,addImage);
router.get('/product/:productId/image/:imageId',authorize,getImage);
router.delete('/product/:productId/image/:imageId',authorize,deleteImage);
router.get('/product/:productId/image',authorize,getAllImage);


async function addImage(req, res) {
  try {
    const image = req.file;
    const createdImage = await userService.addImage(req,res);
    res.status(201).json(createdImage);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Something went wrong while uploading image' });
  }
}

async function getImage(req, res) {
  try {
    const detailImage = await userService.getImage(req,res);
    res.status(200).json(detailImage);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Something went wrong while retrieving image' });
  }
}

async function getAllImage(req, res) {
  try {
    console.log("nnnn");
    const detailImage = await userService.getAllImage(req,res);
    res.status(201).json(detailImage);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Something went wrong' });
  }
}

async function deleteImage(req, res) {
  try {
    const detImage = await userService.deleteImage(req,res);
    res.status(204);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Something went wrong' });
  }
}

function createProduct(req,res,next){
  userService.createProduct(req,res)
  .then(data => {
    res.status(201);res.json(data)
  })
  .catch(data => {
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
    res.status(204);res.json(data)
  })
  .catch(data => {
    res.status(400).send();next()
  });
}

function patchProduct(req,res,next){
  userService.patchProduct(req,res)
  .then(data => {
    res.status(204);res.json(data)
  })
  .catch(data => {
    res.status(400).send();next()
  });
}

function deleteProduct(req, res, next) {
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
    res.status(201);res.json(data)
  })
  .catch(data => {
    res.status(400).send();next()
  });
}

