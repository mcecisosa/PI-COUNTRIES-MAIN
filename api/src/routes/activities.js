const { Router } = require('express');
const { Activity } = require('../db')
const { Country } = require('../db')

const router = Router();

router.get('/', async (req,res) => {

    try{

        const allActivities = await Activity.findAll({ attributes: ['name']});    
        
        res.status(200).send(allActivities)

    }catch(error){
        res.status(404).json('No se pueden mostrar las actividades')
    }

})



router.post('/', async (req,res)=>{

    try{

        const { name, difficulty, duration, season, paises } = req.body

        
        if(!name || name ==='' || !difficulty && isNaN(difficulty) == true || !duration && isNaN(duration) == true || (season!=='Verano' && season!=='Otoño' && season!=='Invierno' && season!=='Primavera') || paises.length===0){

            
            res.status(404).json('Los datos ingresados son incorrectos, la actividad no se ha creado')

        }else{
           
           const newActivity = await Activity.create({name, difficulty, duration, season })

           let countries = await Country.findAll({
               where: { name: paises}
           })

           newActivity.addCountry(countries) 

           res.status(200).json('La actividad se ha creado exitosamente!')
        }        

    }catch(error){

        console.log(error)
        res.status(404).json('La actividad no se ha podido crear')
    }
    
})


module.exports = router;