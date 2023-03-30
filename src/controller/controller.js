const express = require('express');
const router = express.Router();

const stats = require('../stats');
const logger = require('../logs/logs');
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
    logger.info("Adding the new image");
    stats.increment('post/image',1);
    const image = req.file;
    const createdImage = await userService.addImage(req,res);
    res.status(201).json(createdImage);
  } catch (err) {
    console.error(err);
    logger.info("Something went wrong while uploading image");
    res.status(400).json({ error: 'Something went wrong while uploading image' });
  }
}

async function getImage(req, res) {
  try {
    stats.increment('get/image',1);
    logger.info("retrieving the existing image with iimage id");
    const detailImage = await userService.getImage(req,res);
    res.status(200).json(detailImage);
  } catch (err) {
    logger.error("Something went wrong while retriving image");
    res.status(400).json({ error: 'Something went wrong while retrieving image' });
  }
}

async function getAllImage(req, res) {
  try {
    stats.increment('getAll/images',1);
    logger.info("retrieving all the existing images");
    const detailImage = await userService.getAllImage(req,res);
    res.status(201).json(detailImage);
  } catch (err) {
    logger.error("Something went wrong while retriving all images");
    res.status(400).json({ error: 'Something went wrong' });
  }
}

async function deleteImage(req, res) {
  try {
    stats.increment('delete/image',1);
    logger.info("deleting the existing image");
    const detImage = await userService.deleteImage(req,res);
    res.status(204);
  } catch (err) {
    console.error(err);
    logger.error("Something went wrong while deleting image");
    res.status(400).json({ error: 'Something went wrong' });
  }
}

function createProduct(req,res,next){
  stats.increment('post/product',1);
  logger.info("creating the new product");
  userService.createProduct(req,res)
  .then(data => {
    res.status(201);res.json(data)
  })
  .catch(data => {
    logger.error("Something went wrong while creating product");
    res.status(400).send();next()
  });
}

function getProduct(req, res, next) {
  stats.increment('get/product',1);
  logger.info("retrieving the existing product details");
  userService.getProduct(req.params.productId, req, req.body)
      .then(product => res.json(product))
      .catch(next => {
        logger.error("Something went wrong while retriving product");
        res.status(400).send();
      });
}

function updateProduct(req,res,next){
  stats.increment('get/product',1);
  logger.info("updating the existing product");
  userService.updateProduct(req,res)
  .then(data => {
    res.status(204);res.json(data)
  })
  .catch(data => {
    logger.error("Something went wrong while updating product");
    res.status(400).send();next()
  });
}

function patchProduct(req,res,next){
  stats.increment('patch/product',1);
  logger.info("partilly updating the existing product");
  userService.patchProduct(req,res)
  .then(data => {
    res.status(204);res.json(data)
  })
  .catch(data => {
    logger.error("Something went wrong while updating image");
    res.status(400).send();next()
  });
}

function deleteProduct(req, res, next) {
  stats.increment('delete/product',1);
  logger.info("deleting the existing product");
  userService.deleteProduct(req.params.productId, req, res)
      .then(product => {
        res.status(204).json(product)
      })
      .catch(product => {
        logger.error("Something went wrong while deleting product");
        res.status(400).send();
      });
}

function getUserData(req,res,next){
  logger.info("retrieving the existing user details");
  const id = req.params.userId;
  stats.increment('get/user',1);

  userService.getUserData({
    username:req.a.user.name, 
    userId : id
  })
  .then(data => res.json(data))
  .catch(next)
}

function updateUserData(req,res,next){
  logger.info("uodating the existing user details");
  stats.increment('put/user',1);
  userService.updateUser(req.body,req.a.user)
  .then(data => {
    res.status(204);res.json(data)
  })
  .catch(next)
}

function createUser(req,res,next){
  logger.info("Creating the new user");
  stats.increment('post/user',1);
  userService.createUser(req.body)
  .then(data => {
    res.status(201);res.json(data)
  })
  .catch(data => {
    res.status(400).send();next()
  });
}

