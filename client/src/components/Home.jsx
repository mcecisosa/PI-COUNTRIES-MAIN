import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, getActivities, filterByContinent, orderByName } from '../actions/index';
import { Link } from 'react-router-dom';
import Country from './Country'
import Paginado from './Paginado';

export default function Home() {
    
    const dispatch = useDispatch();
    const allCountries = useSelector(state => state.countries)
    const allActivities = useSelector(state => state.activities)

    //PAGINADO

    const [orden, setOrden] = useState('')

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

     function handleClick(e){   
        e.preventDefault();
        dispatch(getCountries())
    } 

    function handleFilterContinent(e){
        dispatch(filterByContinent(e.target.value))
        setCurrentPage(1)
    }

    function handleOrderName(e){
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrden(`orderByName ${e.target.value}`)
    }

    
    return(        
            <div>
                <select onChange = {e => handleFilterContinent(e)}>
                    <option value= 'South America'>South America</option>
                    <option value= 'North America'>North America</option>
                    <option value= 'Europe'>Europe</option>
                    <option value= 'Africa'>Africa</option>
                    <option value= 'Asia'>Asia</option>
                    <option value= 'Oceania'>Oceania</option>
                    <option value= 'Antarctica'>Antarctica</option>
                </select>
                <select>
                {
                    allActivities && allActivities.map((act) => {
                        return <option value= 'hola'>{act.name}</option>
                    })
                }
                </select>
                <select onChange = {e => handleOrderName(e)}>
                    <option value= 'ascendente'>Ascendente</option>
                    <option value= 'descendente'>Descendente</option>
                </select>
                <select>
                    <option value= 'nombre'>Nombre</option>
                    <option value= 'poblacion'>Población</option>
                </select>

                <button>Filtrar</button>

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

