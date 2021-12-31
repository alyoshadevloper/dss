const express = require('express');
const dbCategory = require('../model/Category')
const router = express.Router();

/* POST adding category */

router.get("/" , async (req , res) => {
    const { showAd }  = await req.session
   
    res.render('category' , {
        title: "Добавить категория",
        count : (req.session.showAd) ? showAd.length : 0 ,  
        sActive : true
    })
})

router.post('/', async (req, res) => {
    const db = await new dbCategory({
        title: req.body.title,
    })
    try {
        await db.save()
        res.redirect('/')
    } catch (error) {
        console.log(error);
    }

})


module.exports = router;