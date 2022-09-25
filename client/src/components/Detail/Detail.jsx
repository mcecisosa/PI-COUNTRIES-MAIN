import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../actions/index';
import { Link } from 'react-router-dom';
import Activity from '../Activity/Activity'
import style from './Detail.module.css'

export default function Detail(props){
    
    const dispatch = useDispatch();

    console.log(props.match.params)

    useEffect(()=>{
        dispatch(getDetail(props.match.params.id))
    },[dispatch])

    const country = useSelector((state)=> state.detail)

       
    return(
        <div>
            {
                country ?
                <div class={style.container}>
                    <div class={style.detail}>
                        <h1>{country.name}</h1>
                        <h1>{country.id}</h1>
                        <img src= {country.image}></img>
                        <h2>Continente: {country.continent}</h2>
                        <h2>Subregion: {country.subregion}</h2>
                        <h2>Capital: {country.capital}</h2>
                        <h2>Area: {country.area} km2</h2>
                        <h2>Población: {country.population} personas</h2>
                    </div>    
                    <div class={style.activity}>
                        <h1>Actividades Turísticas:</h1>
                        {country.activities && country.activities.map(el=>{
                            return(
                                <div>                                
                                    <Activity
                                        name = {el.name}
                                        difficulty = {el.difficulty}
                                        duration = {el.duration}
                                        season = {el.season}
                                    />
                                </div>    
                                
                            )
                        }      
                        )}
                    </div>    
                </div> : <p>Loading...</p>   
            }            
        </div>
    )
}

