import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, getActivities, filterByContinent, filterByActivity, orderBy } from '../../actions/index';
import { Link } from 'react-router-dom';
import Country from '../Country/Country'
import Paginado from '../Paginado/Paginado';
import SearchBar from '../SearchBar/SearchBar';
import style from './Home.module.css'

export default function Home() {
    
    const dispatch = useDispatch();
    const allCountries = useSelector(state => state.countries)
    const allActivities = useSelector(state => state.activities)

   
    const [typeOrder, setTypeOrder] = useState({
        alfabeticFilter: '',                        //guarda ascendente o descendente
        attributeFilter: ''                         //guarda nombre o poblacion
    })

     //PAGINADO
    const [currentPage, setCurrentPage] = useState(1)
    const [countriesPerPage, setcountriesPerPage] = useState(9)
    const indexOfLastCountry = currentPage * countriesPerPage
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage
    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry)

    

    const paginado = (pageNumber) =>{

       setCurrentPage(pageNumber)
         if(pageNumber === 1){
         setcountriesPerPage(9)
       }else{
        setcountriesPerPage(10)
       } 
      
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
        if(e.target.value !== 'Elegir Continente'){
            dispatch(filterByContinent(e.target.value))
            setCurrentPage(1)   
        }     
    }

    function handleFilterActivity(e){
        if(e.target.value !=='Elegir Actividad'){
            dispatch(filterByActivity(e.target.value))
            setCurrentPage(1)
        }        
    }

    function handleOrderFilter(e){

        setTypeOrder({
            ...typeOrder, [e.target.name]: e.target.value
        })
    } 

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
            <div class={style.container}>
                <div class={style.filtrado}>
                    <div class={style.continente}>
                        <select onChange = {e => handleFilterContinent(e)}>
                            <option value="Elegir Continente" disabled selected>Elegir Continente</option>
                            <option value= 'South America'>South America</option>
                            <option value= 'North America'>North America</option>
                            <option value= 'Europe'>Europe</option>
                            <option value= 'Africa'>Africa</option>
                            <option value= 'Asia'>Asia</option>
                            <option value= 'Oceania'>Oceania</option>
                            <option value= 'Antarctica'>Antarctica</option>
                        </select>
                    </div>
                    
                    <div class={style.actividad}>
                        <select onChange = {e => handleFilterActivity(e)}>                
                            <option value="Elegir Actividad" disabled selected>Elegir Actividad</option>
                            {allActivities && allActivities.map((act) => {
                                return <option value= {act.name}>{act.name}</option>
                            })}                
                        </select>
                    </div>

                    <div class={style.alfabetico}>
                        <select name='alfabeticFilter' onChange = {e => handleOrderFilter(e)}>
                            <option value="Elegir Orden" disabled selected>Elegir Orden</option>
                            <option value= 'ascendente' >Ascendente</option>
                            <option value= 'descendente'>Descendente</option>
                        </select>
                    </div>

                    <div class={style.tipo}>
                        <select name='attributeFilter' onChange = {e => handleOrderFilter(e)}>
                            <option value="Elegir Tipo" disabled selected>Elegir Tipo</option>
                            <option value= 'nombre' >Nombre</option>
                            <option value= 'poblacion'>Población</option>
                        </select>
                    </div>

                    <div class={style.btnFiltrar}>
                        <button onClick= {e => {handleClickFiltrar(e)}}>Filtrar</button>
                    </div>      

                    <div class={style.btnReset}> 
                        <button onClick= {e => {handleClick(e)}}>Limpiar filtros</button> 
                    </div>

                    <div class={style.searchBar}>
                        <SearchBar/>
                    </div> 

                </div>
                

                <div class={style.paginado}>
                    <Paginado
                        countriesPerPage= {countriesPerPage}
                        allCountries = {allCountries.length}
                        paginado = {paginado}
                    />
                </div>                 

                <div class={style.cards}> 
                    {currentCountries && currentCountries.map((c) =>{
                        return(
                        <fragment>
                                <Link to = {`/countries/${c.id}`} style={{textDecoration:'none',color:'#f3f3f3'}}>
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

