const express = require('express');
const dbCategory = require('../model/Category')
const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) =>  {
  const data  = await dbCategory.find()
  res.render('about', { 
      title: ' О нас' ,
      aActive : true,
      data
    
    });
});

module.exports = router;
