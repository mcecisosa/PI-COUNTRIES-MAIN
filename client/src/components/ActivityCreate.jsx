import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getCountries, postActivity } from '../actions';
import { useDispatch, useSelector } from 'react-redux';

export default function ActivityCreate(){

    const dispatch = useDispatch()
    const history = useHistory()
    const countries = useSelector((state)=> state.countries)

    const [input,setInput] = useState({
        name:"",
        difficulty:"",
        duration:"",
        season:"",
        paises: []
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handleSelect(e){
        setInput({
            ...input,
            paises: [...input.paises, e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log(input)
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

    useEffect(()=>{
        dispatch(getCountries())
    },[dispatch])

    return(
        <div>
            <h1>Crear Actividad Turística</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label>Nombre:</label>
                    <input 
                        type='text' 
                        value={input.name} 
                        name = 'name'
                        onChange={e=>handleChange(e)}>
                    </input>
                </div>

                <div>
                    <label>Dificultad:</label>
                    <input 
                        type='number' 
                        value={input.difficulty} 
                        name = 'difficulty' 
                        min='1' max='5'
                        onChange={e=>handleChange(e)}>
                    </input>
                </div>

                <div>
                    <label>Duración:</label>
                    <input 
                        type='text' 
                        value={input.duration} 
                        name = 'duration'
                        onChange={e=>handleChange(e)}>
                    </input>
                </div>

                <div>
                    <label>Temporada:</label>
                    <select value={input.season} name='season' onChange={e=>handleChange(e)}>
                        <option value='Verano'>Verano</option>
                        <option value='Otoño'>Otoño</option>
                        <option value='Invierno'>Invierno</option>
                        <option value='Primavera'>Primavera</option>
                    </select>
                </div>
                <div>
                    <select onChange={e=>handleSelect(e)}>
                        {countries.map((c)=>{
                            return <option value={c.name}>{c.name}</option>  //ordenar por orden alfabetico
                        })}
                    </select>
                </div>
                <div>
                    {input.paises.map((e) => (
                            <ul>
                                <li>{e}</li>
                            </ul>                          
                    ))}               
                </div>
                <div>
                    <button type='onsubmit'>Crear Actividad</button>
                </div>
                
            </form>
        </div>
    )
}


