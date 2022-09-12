import React from 'react';
import { Link } from 'react-router-dom'


export default function NavBar(){
    return(
        <div>
            <Link to= '/countries'><button>Home</button></Link>
            <Link to= '/activities'><button>Nueva Actividad</button></Link>
        </div>
    )
}