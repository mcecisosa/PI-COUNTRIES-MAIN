import React from 'react';
import style from './Activity.module.css'



export default function Activity({name, difficulty, duration, season}){
    return(
        <div class={style.container}>
            <h3>{name}</h3> 
            <div class={style.datos}>
                <h4>Dificultad: {difficulty}</h4>
                <h4>Duración: {duration} horas</h4>
                <h4>Temporada: {season}</h4>
            </div>     
            
        </div>
    );
}

