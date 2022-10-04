import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getCountries, postActivity } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import style from './ActivityCreate.module.css'


function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = 'Debe ingresar un nombre'
    }/* if(!/[A-Za-z0-9]/.test(input.name)){
        errors.name = 'El nombre admite solo letras, numeros y espacios'     
    } */if(!input.difficulty){
        errors.difficulty = 'Debe ingresar un valor entre 1 y 5'
    }if(input.difficulty<1 || input.difficulty>5){
            errors.difficulty = 'Debe ingresar un valor entre 1 y 5'
    }if(!input.duration){
        errors.duration = 'Debe ingresar la duración en horas'
    }if(input.duration<0 || input.duration>24){
        errors.duration = 'La duración debe ser de 1 a 24 horas'
    }if(!input.season){
        errors.season = 'Debe seleccionar una temporada'
    }if(input.paises.length === 0){
        errors.paises = 'Debe seleccionar al menos un país'    
    }
    return errors;
}


export default function ActivityCreate(){

    const dispatch = useDispatch()
    const history = useHistory()
    const countries = useSelector((state)=> state.countries)
    const [errors, setErrors] = useState({})

    const [input,setInput] = useState({
        name:"",
        difficulty:"",
        duration:"",
        season:"",
        paises: []
    })

    function handleChange(e){

        if(e.target.value !=='Elegir Temporada'){

            setInput({
                ...input,
                [e.target.name]: e.target.value
            })       
    
             setErrors(validate({
                ...input,
                [e.target.name]: e.target.value
            }))
        }  
    }

    function handleSelect(e){
        setInput({
            ...input,
            paises: [...input.paises, e.target.value]
        })

        setErrors(validate({
            ...input,
            paises: [...input.paises, e.target.value]
        }))             
    }

    

    function handleSubmit(e){
        e.preventDefault()

        if(JSON.stringify(errors) === '{}'){

            dispatch(postActivity(input))
            alert('actividad creada')
            setInput({
                name:"",
                difficulty:"",
                duration:"",
                season:"",
                paises: []
            })
            history.push('/countries')
        } 
        else{
            alert('Verifique los datos ingresados')
        }      
    }

    function handleDelete(e){
        
        setInput({
            ...input, 
            paises: input.paises.filter(c => c!==e)
        })

        setErrors(validate({
            ...input,
            paises: input.paises.filter(c => c!==e)
        }))      

    }
    /* console.log('hola') */
    useEffect(()=>{
        dispatch(getCountries())
    },[dispatch])

    return(
        <div class={style.container}>
            
            <div class={style.card}>

                <div class={style.title}>
                    <h2>Crear Actividad Turística</h2>
                </div>

                <div class={style.form}>

                    <form onSubmit={(e)=>handleSubmit(e)}>

                        <div class={style.name}>
                            <h3>Nombre:</h3>
                            <input 
                                type='text' 
                                value={input.name} 
                                name = 'name'
                                onChange={e=>handleChange(e)}>
                            </input>                            
                        </div>
                        <div class={style.errors}>
                            {errors.name && (<p>{errors.name}</p>)}
                        </div>

                        <div class={style.difficulty}>
                            <h3>Dificultad:</h3>
                            <input 
                                type='number' 
                                value={input.difficulty} 
                                name = 'difficulty' 
                                min='1' max='5'
                                onChange={e=>handleChange(e)}>
                            </input>                            
                        </div>
                        <div class={style.errors}>
                             {errors.difficulty && (<p>{errors.difficulty}</p>)}
                        </div>

                        <div class={style.duration}>
                            <h3>Duración:</h3>
                            <input 
                                type='text' 
                                value={input.duration} 
                                name = 'duration'
                                onChange={e=>handleChange(e)}>
                            </input>                            
                        </div>
                        <div class={style.errors}>
                            {errors.duration && (<p>{errors.duration}</p>)}
                        </div>

                        <div class={style.season}>
                            <h3>Temporada:</h3>
                            <select value={input.season} name='season' onChange={e=>handleChange(e)}>
                                <option value="Elegir Temporada">Elegir Temporada</option>
                                <option value='Verano'>Verano</option>
                                <option value='Otoño'>Otoño</option>
                                <option value='Invierno'>Invierno</option>
                                <option value='Primavera'>Primavera</option>
                            </select>                            
                        </div>
                        <div class={style.errors}>
                            {errors.season && (<p>{errors.season}</p>)}
                        </div>
                        <div class={style.countries}>
                            <h3>Paises:</h3>
                            <select onChange={e=>handleSelect(e)}>
                                <option disabled selected>Elegir País</option>
                                {countries.map((c)=>{
                                    return <option value={c.name}>{c.name}</option>  //ordenar por orden alfabetico
                                })}
                            </select>                            
                        </div>
                        <div class={style.errors}>
                            {input.paises.length === 0 && (<p>{errors.paises}</p>)}
                        </div>
                        
                        <div class={style.btn}>
                            <button>Crear Actividad</button>                                          
                        </div>                        
                    </form>
                </div>               
                
                

            </div>

            <div class={style.countrySelected}>
                    {input.paises.map((e) => (
                        <ul>
                            <h4>{e}</h4>  {/* li */}
                            <button onClick={()=>handleDelete(e)}>X</button>
                        </ul>                          
                        ))}               
                </div>
            
        </div>
    )
}


