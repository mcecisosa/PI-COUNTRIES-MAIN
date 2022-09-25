import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getCountries, postActivity } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../NavBar/NavBar'
import style from './ActivityCreate.module.css'
import styleNav from '../NavBar/NavBar.module.css'

function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = 'Debe ingresar un nombre'
    }if(!input.difficulty){
        errors.difficulty = 'Debe ingresar un valor entre 1 y 5'
    }if(!input.duration){
        errors.duration = 'Debe ingresar la duración en horas'
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

    useEffect(()=>{
        dispatch(getCountries())
    },[dispatch])

    return(
        <div>
            <div class={styleNav.container}>
                <NavBar></NavBar>
            </div>
            <div class={style.container}>

                <div class={style.title}>
                    <h1>Crear Actividad Turística</h1>
                </div>

                <div class={style.form}>

                    <form onSubmit={(e)=>handleSubmit(e)}>

                        <div class={style.name}>
                            <label>Nombre:</label>
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
                            <label>Dificultad:</label>
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
                            <label>Duración:</label>
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
                            <label>Temporada:</label>
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
                            <select onChange={e=>handleSelect(e)}>
                                {countries.map((c)=>{
                                    return <option value={c.name}>{c.name}</option>  //ordenar por orden alfabetico
                                })}
                            </select>                            
                        </div>
                        <div class={style.errors}>
                            {input.paises.length === 0 && (<p>{errors.paises}</p>)}
                        </div>
                        
                        <div class={style.btn}>
                            <button id='btn'>Crear Actividad</button>                                          
                        </div>                        
                    </form>
                </div>               
                
                <div class={style.countrySelected}>
                    {input.paises.map((e) => (
                        <ul>
                            <li>{e}</li>
                            <button onClick={()=>handleDelete(e)}>X</button>
                        </ul>                          
                        ))}               
                </div>

            </div>
            
        </div>
    )
}


//