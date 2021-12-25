const express = require('express');
const dbCategory = require('../model/Category')
const dbProduct = require('../model/Product')
const router = express.Router();

/* GET home page. */

router.get('/', async (req, res, next) => {
 const data  = await dbCategory.find()
  res.render('product', { 
    title: 'Товары' ,
     data
  });
});

/* GET method for one card */

router.get('/:id' , async (req , res) => {
  const db = await dbProduct.findById(req.params.id)
  const otherProduct = await dbProduct.find({category : db.category})
  console.log(otherProduct);
  const data  = await dbCategory.find()
  res.render('product' , {
    title: 'Товары' ,
    data,
    db,
    otherProduct
  })
})

module.exports = router;
