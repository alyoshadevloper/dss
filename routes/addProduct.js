const express = require('express');
const dbProduct = require('../model/Product')
const dbCategory = require('../model/Category')
const moment = require('moment')
const toDelete = require("../middleware/fileDelete");
const fileUpload = require('../middleware/fileUpload')
const router = express.Router();

/* GET addProduct page. */
router.get('/', async (req, res, next) => {
  const data = await dbCategory.find()
  res.render('addProduct', {
    title: 'Добавить товары',
    pActive: true,
    data
  });
});

/* POST adding product */

router.post('/', fileUpload.array('photo'), async (req, res) => {
  req.files ? (photo = req.files) : (photo = "")
  const db = await new dbProduct({
    title: req.body.title,
    price: req.body.price,
    photo,
    about: req.body.about,
    category: req.body.category,
    dateNow: moment().locale('ru').format('l')
  })
  try {
    await db.save()
    res.redirect('/')
  } catch (error) {
    console.log(error);
  }

})

/* UPDATE card info  method GET  */

router.get('/update/:id', async (req, res) => {
  const db = await dbProduct.findById(req.params.id)
  const data = await dbCategory.find()
  res.render("addProduct", {
    title: "Изменить",
    pUpdate: true,
    db,
    data
  })
})

/* UPDATE card info  method POST  */

router.post('/update/:id', fileUpload.array('photo'), async (req, res) => {
  const db = {
    title: req.body.title,
    price: req.body.price,
    photo: req.files,
    about: req.body.about,
    category: req.body.category,
    dateNow: moment().locale('ru').format('l')
  }

  const {
    photo
  } = await dbProduct.findById(req.params.id)
  if (req.files.length) {
    db.photo = req.files
    toDelete(photo)
  } else {
    db.photo = photo
  }

  await dbProduct.findByIdAndUpdate(req.params.id, db, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/')
    }
  })
})


/* DELETE card info  method POST  */

router.get('/delete/:id', fileUpload.array('photo'), async (req, res) => {
  try {
    const {
      photo
    } = await dbProduct.findById(req.params.id)
    toDelete(photo)
    await dbProduct.findByIdAndDelete(req.params.id)
    res.redirect('/')
  } catch (error) {
    res.send(error , 'Mahsulot ochirishda xatolik yuz berdi')
  }

})


module.exports = router;