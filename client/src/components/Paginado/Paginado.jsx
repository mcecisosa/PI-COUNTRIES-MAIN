import React from "react";
import style from './Paginado.module.css'

export default function Paginado ({countriesPerPage, allCountries, paginado}){
    const pageNumbers = [];

    for(let i=0; i<Math.ceil(allCountries/countriesPerPage); i++){
        pageNumbers.push(i+1)
    }

    return(
        <nav class={style.container}>
            <ul class={style.paginacion}>
                {pageNumbers && pageNumbers.map((number)=>{                                         
                      return <li key={number}><a onClick={()=>paginado(number) }>{number}</a></li>})
                }
            </ul>
        </nav>
    )
}

