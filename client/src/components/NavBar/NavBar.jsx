import React from 'react';
import { Link } from 'react-router-dom'
import style from './NavBar.module.css'


export default function NavBar(){
    return(
        <div class={style.container}>
            <h3>Explore the World!</h3>
            <Link to= '/countries'><button class={style.btnHome}>Home</button></Link>
            <Link to= '/activity'><button class={style.btnActividad
            
            }>Nueva Actividad</button></Link>
        </div>
    )
}