const { Router } = require('express');
const { Country } = require('../db')

const router = Router();


router.get('/', (req,res)=>{
    res.send('soy get /countries')
})

router.post('/', (req,res)=>{
    res.send('soy post /countries')
})


module.exports = router;