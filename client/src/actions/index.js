import { GET_ALL_COUNTRIES, GET_ALL_ACTIVITIES } from './typeActions';



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

