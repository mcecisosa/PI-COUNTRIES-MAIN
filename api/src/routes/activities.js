const { Router } = require('express');
const { Activity } = require('../db')
const { Country } = require('../db')

const router = Router();

router.get('/', async (req,res) => {

    try{

        const allActivities = await Activity.findAll({ attributes: ['name', 'id']});   
        
        if(allActivities.length>0){
            res.status(200).send(allActivities)
        }  
        else{
            res.status(404).json('No existen actividades')
        }  
        
        

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

router.delete('/:id', async (req,res)=>{

    const { id } = req.params
    
    try{

        let filaBorrada = await Activity.destroy({
            where:{id: id},
            truncate: {cascade: true}
        });
        if(filaBorrada === 1){
            res.status(200).json('La actividad fue eliminada')  
        }                    

    }catch(error){
        
        res.status(404).json("La actividad no se pudo eliminar")

    }     
})

router.put('/update/:id', async (req,res)=>{

    let {id} = req.params

    try{

        const { name, difficulty, duration, season, paises } = req.body

        
        if(!name || name ==='' || !difficulty && isNaN(difficulty) == true || !duration && isNaN(duration) == true || (season!=='Verano' && season!=='Otoño' && season!=='Invierno' && season!=='Primavera') || paises.length===0){

            
            res.status(404).json('Los datos ingresados son incorrectos, la actividad no se ha modificado')

        }else{
           
          
           const updateAct = await Activity.update({name, difficulty, duration, season}, 
            {
            where: {
                id: id,
            }
        });

           console.log(updateAct)
           res.status(200).json('La actividad se ha modificado exitosamente!') 
        }        

    }catch(error){

        console.log(error)
        res.status(404).json('La actividad no se ha podido crear')
    }
    
})


module.exports = router;