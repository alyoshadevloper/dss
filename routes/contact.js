const express = require('express');
const dbCategory = require('../model/Category')
const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
   const { showAd }  = await req.session
   
 const data  = await dbCategory.find()
  res.render('contact', { 
      title: 'Контакт' ,
      cActive : true,
      data ,
      count : (req.session.showAd) ? showAd.length : 0 ,  
    });
});

module.exports = router;
