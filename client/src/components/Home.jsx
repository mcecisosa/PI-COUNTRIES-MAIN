import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, getActivities, filterByContinent, filterByActivity, orderBy } from '../actions/index';
import { Link } from 'react-router-dom';
import Country from './Country'
import Paginado from './Paginado';
import SearchBar from './SearchBar';

export default function Home() {
    
    const dispatch = useDispatch();
    const allCountries = useSelector(state => state.countries)
    const allActivities = useSelector(state => state.activities)

    //PAGINADO

    const [typeOrder, setTypeOrder] = useState({
        alfabeticFilter: '',                        //guarda ascendente o descendente
        attributeFilter: ''                         //guarda nombre o poblacion
    })

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

    function handleFilterActivity(e){
        dispatch(filterByActivity(e.target.value))
        setCurrentPage(1)
    }

    function handleOrderFilter(e){

        console.log('target.name= ' + e.target.name)
        console.log('target.value= ' + e.target.value)

        setTypeOrder({
            ...typeOrder, [e.target.name]: e.target.value
        })
    } 

    console.log(typeOrder)

    function handleClickFiltrar(e){   
        e.preventDefault();
        dispatch(orderBy(typeOrder))
        setCurrentPage(1)
        setTypeOrder({
            alfabeticFilter: typeOrder.alfabeticFilter,                        
            attributeFilter: typeOrder.attributeFilter                       
        })       
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
                <select onChange = {e => handleFilterActivity(e)}>
                {
                    allActivities && allActivities.map((act) => {
                        return <option value= {act.name}>{act.name}</option>
                    })
                }
                </select>
                <select name='alfabeticFilter' onChange = {e => handleOrderFilter(e)}>
                    <option value= 'ascendente' >Ascendente</option>
                    <option value= 'descendente'>Descendente</option>
                </select>
                <select name='attributeFilter' onChange = {e => handleOrderFilter(e)}>
                    <option value= 'nombre' >Nombre</option>
                    <option value= 'poblacion'>Población</option>
                </select>

                <button onClick= {e => {handleClickFiltrar(e)}}>Filtrar</button>

                <button onClick= {e => {handleClick(e)}}>Volver a cargar todos los paises</button> 
                
                <Paginado
                    countriesPerPage= {countriesPerPage}
                    allCountries = {allCountries.length}
                    paginado = {paginado}
                />

                <SearchBar/>
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

