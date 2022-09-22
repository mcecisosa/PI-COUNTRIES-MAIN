import React from 'react';



export default function Activity({name, difficulty, duration, season}){
    return(
        <div>
            <h3>{name}</h3>      
            <h4>Dificultad: {difficulty}</h4>
            <h4>Duración: {duration} horas</h4>
            <h4>Temporada: {season}</h4>
        </div>
    );
}

