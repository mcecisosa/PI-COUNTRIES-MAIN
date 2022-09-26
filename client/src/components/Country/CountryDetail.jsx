import React from 'react';

export default function CountryDetail({image, name, id, continent, subregion, capital, area, population}){
    return(
        <div >
                <img src={image}/>
                <h1>{name}</h1>
                <h2>{continent}</h2>
                <h2>{id}</h2>                                                          
                <h3>Subregion: {subregion}</h3>
                <h3>Capital: {capital}</h3>
                <h3>Area: {area} km2</h3>
                <h3>Población: {population} personas</h3>                  
        </div>
    );
}