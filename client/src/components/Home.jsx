import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries } from '../actions/index';
import { Link } from 'react-router-dom';
import Country from './Country'

export default function Home() {
    
    const dispatch = useDispatch();
    const allCountries = useSelector(state => state.countries)

    useEffect(()=>{
        dispatch(getCountries())
    },[dispatch])

   /*  function handleClick(e){   //ESTO COMENTADO ES PORQUE ESTE CODIGO LO PASE AL SEARCH BAR, ANTES ESTABA AQUI
        e.preventDefault();
        dispatch(getCountries())
    } */

    return(
        <div>
                     
            {/* <button onClick= {e => {handleClick(e)}}>
                Volver a cargar todos los paises
            </button> */} 
            <div>
               
                {                    
                    allCountries && allCountries.map((c) =>{
                        return(
                            <fragment className = 'cartas'>
                                <Link to = {`/countries/${c.id}`}>
                                    <Country
                                        name = {c.name}
                                        image = {c.image}
                                        continent = {c.continent}
                                        key = {c.id}
                                    />                                
                                </Link>                                
                            </fragment>
                        );                        
                    })
                }
            </div>           
        </div>
        
    )
}

//linea 31
{/* <select>
<option value= 'asc'>Ascendente</option>
<option value= 'desc'>Descendente</option>
</select>
<select>
<option value= 'southAmerica'>South America</option>
<option value= 'northAmerica'>North America</option>
<option value= 'europe'>Europe</option>
<option value= 'africa'>Africa</option>
<option value= 'asia'>Asia</option>
<option value= 'oceania'>Oceania</option>
<option value= 'antarctic'>Antarctic</option>
</select>
<select>
<option value= 'actividades'>Tipo Actividades HACER!</option>
</select> */}