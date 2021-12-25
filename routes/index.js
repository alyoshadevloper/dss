const express = require('express');
const dbProduct = require('../model/Product')
const dbCategory = require('../model/Category')
const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  const db = await dbProduct.find()
  const data = await dbCategory.find()
  res.render('index', {
    title: 'Главная',
    eActive: true,
    db,
    data
  });
});



module.exports = router;