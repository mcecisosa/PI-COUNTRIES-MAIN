const { Router } = require('express');
const { Activity } = require('../db')
const { Country } = require('../db')

const router = Router();

router.get('/', async (req,res) => {

    try{

        const allActivities = await Activity.findAll({ attributes: ['name']});    
        
        res.status(200).send(allActivities)

    }catch(error){
        res.status(404).send('No se pueden mostrar los paises')
    }

})



router.post('/', async (req,res)=>{

    try{
        const { name, difficulty, duration, season, pais } = req.body

        const newActivity = await Activity.create({name,difficulty, duration, season })

        let countries = await Country.findAll({
            where: { name: pais}
        })

        newActivity.addCountry(countries) 

        res.status(200).send('La actividad se ha creado exitosamente!')

    }catch(error){

        res.status(404).send('La actividad no se ha podido crear')
    }
    
})


module.exports = router;