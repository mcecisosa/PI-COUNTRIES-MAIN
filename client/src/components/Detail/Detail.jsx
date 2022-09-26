import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../actions/index';
import { Link } from 'react-router-dom';
import Activity from '../Activity/Activity'
import CountryDetail from '../Country/CountryDetail'
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
                        <CountryDetail
                            image = {country.image}
                            name = {country.name}
                            id = {country.id}
                            continent = {country.continent}
                            subregion ={country.subregion}
                            capital = {country.capital}
                            area = {country.area}
                            population = {country.population}
                        /> 
                    </div>    
                    <div class={style.activity}>
                        <h1>Actividades Turísticas</h1>
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

