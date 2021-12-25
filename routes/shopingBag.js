const express = require('express')
const store = require("store2");
const fetch = require('node-fetch')
const dbProduct = require('../model/Product')
const router = express.Router()




router.get('/', async (req, res) => {
    const data = store('sas')
    const db  =  await  dbProduct.find({ _id :  data })
    res.render('shoppingBag', {
        title: "Корзина",
        db
    })
 






})


router.post('/', async (req, res) => {
    console.log(req.body);
    await store.set("sas", req.body.dataId)
    res.redirect('/bag')

})

// router.get('/remove/:id' ,  async (req , res) => {
//     const data = await store.getAll()
//     console.log(data);
//     store.remove(req.params.id)

// })


module.exports = router