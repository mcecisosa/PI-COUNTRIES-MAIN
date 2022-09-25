import React from "react";
import { Link } from 'react-router-dom'
import style from './Landing.module.css'

export default function Landing(){
    return(
        <div class={style.container}>
            
            <h1 class={style.title}>Explore the World!</h1>
            <Link to = '/countries'><button class={style.btn} >Let's go...</button></Link>
        </div>
    )
}