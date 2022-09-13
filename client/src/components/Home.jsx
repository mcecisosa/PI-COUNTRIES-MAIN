import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, getActivities } from '../actions/index';
import { Link } from 'react-router-dom';
import Country from './Country'
import Paginado from './Paginado';

export default function Home() {
    
    const dispatch = useDispatch();
    const allCountries = useSelector(state => state.countries)
    const allActivities = useSelector(state => state.activities)

    //PAGINADO

    const [currentPage, setCurrentPage] = useState(1)
    const [countriesPerPage, setcountriesPerPage] = useState(10)
    const indexOfLastCountry = currentPage * countriesPerPage
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage
    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry)

    const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getCountries())
    },[dispatch])

    useEffect(()=>{
        dispatch(getActivities())
    },[dispatch])

     function handleClick(e){   //ESTO COMENTADO ES PORQUE ESTE CODIGO LO PASE AL SEARCH BAR, ANTES ESTABA AQUI
        e.preventDefault();
        dispatch(getCountries())
    } 

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
                <button onClick= {e => {handleClick(e)}}>Volver a cargar todos los paises</button> 
                
                <Paginado
                    countriesPerPage= {countriesPerPage}
                    allCountries = {allCountries.length}
                    paginado = {paginado}
                />
                {                    
                    currentCountries && currentCountries.map((c) =>{
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
    )
}

