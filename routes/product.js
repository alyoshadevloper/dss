const express = require('express');
const dbCategory = require('../model/Category')
const dbProduct = require('../model/Product')
const router = express.Router();

/* GET home page. */

router.get('/', async (req, res, next) => {
  const { showAd }  = await req.session
  
 const data  = await dbCategory.find()
  res.render('product', { 
    title: 'Товары' ,
     data,
     count : (req.session.showAd) ? showAd.length : 0 ,  
  });
});

/* GET method for one card */

router.get('/:id' , async (req , res) => {
  const { showAd }  = await req.session
   
  const db = await dbProduct.findById(req.params.id)
  const otherProduct = await dbProduct.find({category : db.category})
  const data  = await dbCategory.find()
  res.render('product' , {
    title: 'Товары' ,
    data,
    db,
    otherProduct ,
    count : (req.session.showAd) ? showAd.length : 0 ,  
  })
})

module.exports = router;
