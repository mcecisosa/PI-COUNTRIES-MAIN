const { Router } = require('express');
const { Activity } = require('../db')
const { Country } = require('../db')

const router = Router();

router.get('/', async (req,res) => {

    try{

        const allActivities = await Activity.findAll({ attributes: ['name']});    
        
        res.status(200).send(allActivities)

    }catch(error){
        res.status(404).send('No se pueden mostrar las actividades')
    }

})



router.post('/', async (req,res)=>{

    try{

        console.log('entra al router.post y consologue el body')
        console.log(req.body)

        const { name, difficulty, duration, season, paises } = req.body

        const newActivity = await Activity.create({name, difficulty, duration, season })

        let countries = await Country.findAll({
            where: { name: paises}
        })

        newActivity.addCountry(countries) 

        res.status(200).json('La actividad se ha creado exitosamente!')

    }catch(error){

        res.status(404).send('La actividad no se ha podido crear')
    }
    
})


module.exports = router;