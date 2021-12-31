const express = require('express')
const dbProduct = require('../model/Product')
const router = express.Router()

router.get('/', async (req, res) => {
    console.log(req.session);
    if(req.session.showAd){
        const { showAd }  = await req.session
        const count = showAd.length
        const ids =  await [...showAd ]
        
        const db = await dbProduct.find({ _id : ids })
        res.render('shoppingBag' , {
            title : "Корзина",
            db,
            count : count
        } )
    }else{
        res.render('shoppingBag' , {
            title : "Корзина",
             
        })
    }
})


  router.post('/', async (req, res) => {
      const { bodyId   } =  await req.body
      const { showAd } =  await req.session
      if(req.session.showAd &&  showAd[showAd.indexOf(bodyId)] !== bodyId ){
        req.session.showAd.push(bodyId)
      }else{
        req.session.showAd = [bodyId]
      }
      res.sendStatus(200)
  
})

router.get('/delete/:id' , async  (req  , res) => {

    const { showAd }  = await req.session
    if(req.params.id){
         await showAd.splice(showAd.indexOf(req.params.id)  , 1)
         res.redirect('/bag')
    }else{
        res.redirect('/bag')
    }
        
     

})


module.exports = router