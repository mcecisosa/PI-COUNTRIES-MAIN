import { GET_ALL_COUNTRIES, GET_ALL_ACTIVITIES, POST_ACTIVITY, GET_NAME_COUNTRY, GET_DETAIL, FILTER_BY_CONTINENT, FILTER_BY_ACTIVITY, ORDER_BY } from './typeActions';



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

export const postActivity = (payload) => {

    return async function (dispatch){

        try{

          return fetch("http://localhost:3001/activities",{
            method: 'POST',
            body: JSON.stringify(payload),
            headers:{'Content-type': 'application/json; charset=utf-8'}
          })
          .then(response => response.json())
          .then(json => {
             dispatch({ type: POST_ACTIVITY, payload: json }); 
          });

        }catch(error){
            
        }

        
    }           
}; 

export const getNameCountry = (payload) => {
    return async function (dispatch){

        return fetch(`http://localhost:3001/countries?name=${payload}`)
        .then(response => response.json())
         .then(json => {
          dispatch({ type: GET_NAME_COUNTRY, payload: json }); 
                  
        });
    }
}; 

export const getDetail = (id) => {
    return async function (dispatch){

        try{
             return fetch(`http://localhost:3001/countries/${id}`)
            .then(response => response.json())
             .then(json => {
              dispatch({ type: GET_DETAIL, payload: json }); 
                      
            });

        }catch(error){
            console.log(error)
        }       
    }
}; 



export const filterByContinent = (payload) => {
    return {
        type: FILTER_BY_CONTINENT,
        payload: payload
    }
}

export const filterByActivity = (payload) => {
    return {
        type: FILTER_BY_ACTIVITY,
        payload: payload
    }
}

export const orderBy = (payload) =>{
    return{
        type: ORDER_BY,
        payload:payload
    }
}



