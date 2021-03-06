const express = require('express');
const axios = require('axios')
const dbProduct = require('../model/Product')
const dbCategory = require('../model/Category')
const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  const { showAd }  = await req.session
  const db = await dbProduct.find()
  const data = await dbCategory.find()
  res.render('index', {
    title: 'Главная',
    eActive: true,
    db,
    data ,
    count : (req.session.showAd) ? showAd.length : 0  ,

  });
});



module.exports = router;