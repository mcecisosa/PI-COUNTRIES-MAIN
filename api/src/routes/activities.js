const { Router } = require('express');
const { Activity } = require('../db')

const router = Router();

router.post('/', (req,res)=>{
    res.send('soy post /activities')
})



module.exports = router;