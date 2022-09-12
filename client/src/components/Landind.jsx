import React from "react";
import { Link } from 'react-router-dom'


export default function Landing(){
    return(
        <div>
            <h1>Bienvenidos a mi pagina web de Countries</h1>
            <Link to = '/countries'><button>Ingresar</button></Link>
        </div>
    )
}