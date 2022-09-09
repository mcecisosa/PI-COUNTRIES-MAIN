const { default: axios } = require('axios');
const { Router } = require('express');
const { Country, Activity} = require('../db')
const { Op } = require('sequelize');



const router = Router();


router.get('/', async (req,res)=>{

    try{
        //traigo de api
        const countriesApi = await axios.get('https://restcountries.com/v3.1/all') 
        
        //paso a BD
        countriesApi.data.forEach(c =>{

            Country.findOrCreate({
                where:{ id: c.cca3 },
                defaults:{
                        name: c.name.common,
                        image: c.flags.png,
                        continent: c.continents[0],
                        capital: c.capital? c.capital[0] : 'No Data',
                        subregion: c.subregion? c.subregion : 'No Data',
                        area: c.area,
                        population: c.population 
                }
            })
        }) 

        const {name} = req.query
        if(name){
            //traigo datos de BD filtrado por name
            const allCountries = await Country.findAll({ 
                                            attributes: ['name','continent','image'],
                                            where: {
                                                name: {[Op.iLike]: "%" + name + "%"}
                                            }
            });
            
            if(allCountries.length>0){
                res.status(201).send(allCountries)
            }  
            else{
                res.status(404).send('No existen datos del país ingresado')
            }

        }else{

            //traigo datos de BD       
           const allCountries = await Country.findAll({ attributes: ['name','continent','image']});    
        
            res.status(200).send(allCountries)

        }
 
    }catch(error){

        res.status(404).send(error.message)
    }
})

router.get('/:id', async (req,res)=>{

    const { id } = req.params
    console.log(id)
    try{

        let detail = await Country.findByPk(id.toUpperCase(), { include: [Activity] });

        res.send(detail)

    }catch(error){

    }    
})




module.exports = router;