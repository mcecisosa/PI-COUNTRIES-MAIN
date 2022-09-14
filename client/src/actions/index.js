import { GET_ALL_COUNTRIES, GET_ALL_ACTIVITIES, FILTER_BY_CONTINENT, ORDER_BY_NAME, ORDER_BY_POPULATION } from './typeActions';



export const getCountries = () => {
    return async function (dispatch){

        return fetch("http://localhost:3001/countries")
        .then(response => response.json())
         .then(json => {
          dispatch({ type: GET_ALL_COUNTRIES, payload: json }); 
                  
        });
    }
}; 

export const getActivities = () => {
    return async function (dispatch){

        return fetch("http://localhost:3001/activities")
        .then(response => response.json())
         .then(json => {
          dispatch({ type: GET_ALL_ACTIVITIES, payload: json }); 
                  
        });
    }
}; 

export const filterByContinent = (payload) => {
    return {
        type: FILTER_BY_CONTINENT,
        payload: payload
    }
}

export const orderByName = (payload) =>{
    return{
        type: ORDER_BY_NAME,
        payload:payload
    }
}

export const orderByPopulation = (payload) =>{
    return{
        type: ORDER_BY_POPULATION,
        payload:payload
    }
}



