import React from 'react';
import { getCountries } from '../actions/index';
import { getActivities } from '../actions/index';
import { useDispatch, useSelector } from 'react-redux'; //+++
import { useEffect } from 'react';


export default function SearchBar(){

    const dispatch = useDispatch(); //+++
    const allActivities = useSelector(state => state.activities)

    useEffect(()=>{
        dispatch(getActivities())
    },[dispatch])

    function handleClick(e){   //+++
        e.preventDefault();
        dispatch(getCountries())        
    }

    console.log(allActivities);
    return(
        <div>
            <select>
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
                {
                    allActivities && allActivities.map((act) => {
                        return <option value= 'hola'>{act.name}</option>
                    })
                }
                
            </select>
            <button onClick= {e => {handleClick(e)}}>Volver a cargar todos los paises</button> {/*++++*/}
        </div>
    )
}

//linea 41
//<option value= 'actividades'>Tipo Actividades HACER!</option>