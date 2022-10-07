import { GET_ALL_COUNTRIES, 
         GET_ALL_ACTIVITIES, 
         GET_NAME_COUNTRY, 
         GET_DETAIL, 
         FILTER_BY_CONTINENT, 
         ORDER_BY, 
         FILTER_BY_ACTIVITY, 
         POST_ACTIVITY, 
         DELETE_ACTIVITY } from "../actions/typeActions";

const initialState = {
    countries: [],
    activities: [],
    detail: [],
    allCountries: [],
    alertas: []
}

const rootReducer = (state = initialState, action) => {

    var allCountries = [];

    switch(action.type){

                
        case GET_ALL_COUNTRIES: return {...state, countries: action.payload, allCountries: action.payload}

        case GET_ALL_ACTIVITIES: return {...state, activities: action.payload}

        case GET_NAME_COUNTRY: return {...state, countries: action.payload}       

        case GET_DETAIL: return {...state, detail: action.payload}

        case POST_ACTIVITY: return {...state}

        /* case POST_ACTIVITY: console.log('recibe json del action post'); console.log(action.payload); return {...state, alertas: action.payload} */

        case FILTER_BY_CONTINENT: 

                allCountries = state.allCountries;
                const continentFilter = allCountries.filter(el => el.continent === action.payload)
                
                return {...state, countries: continentFilter}

        case FILTER_BY_ACTIVITY:
                var filt=[];
                
                allCountries = state.allCountries;

                allCountries.forEach(el => {
                    el.activities.forEach((act) => {
                        if (act.name === action.payload){
                            filt.push(el)
                        }
                    })
                }) 
                //ALTERNATIVA EN FOR ANTIGUO PARA EL CASO DE ARRIBA
             /*for(var i=0; i<allCountries.length;i++){
                    for(var j=0; j<allCountries[i].activities.length;j++){
                        if(allCountries[i].activities[j].name === action.payload){
                            filt.push(allCountries[i])
                        }
                    }
                } */                          
                console.log('reducer filterAct')
                console.log(filt)

                

                return {...state, countries: filt}

        case ORDER_BY:
            var countrySorted=[]
            //{alfabeticFilter: '', attributeFilter: ''}  //ascendente o descendente, nombre o poblacion   

                if(action.payload.alfabeticFilter === 'ascendente' && action.payload.attributeFilter === 'nombre' ){
                    countrySorted = state.countries.sort(function(a,b){
                        if(a.name > b.name)  return 1;
                        if(b.name > a.name)  return -1;
                        return 0;
                })
                }else if(action.payload.alfabeticFilter === 'descendente' && action.payload.attributeFilter === 'nombre' ){
                    console.log('entra al if')
                    countrySorted = state.countries.sort(function(a,b){
                        if(a.name > b.name)  return -1;
                        if(b.name > a.name)  return 1;
                        return 0;
                    })
                }else if(action.payload.alfabeticFilter === 'ascendente' && action.payload.attributeFilter === 'poblacion' ){
                    countrySorted = state.countries.sort(function(a,b){
                        if(a.population > b.population)  return 1;
                        if(b.population > a.population)  return -1;
                        return 0;
                })
                
            }else if(action.payload.alfabeticFilter === 'descendente' && action.payload.attributeFilter === 'poblacion' ){
                countrySorted = state.countries.sort(function(a,b){
                    if(a.population > b.population)  return -1;
                    if(b.population > a.population)  return 1;
                    return 0;
                })
            }  
            console.log(countrySorted)          
            return {...state, countries: countrySorted}

            case DELETE_ACTIVITY:
                console.log('action.payload del reducer')
                console.log(action.payload)
                return {
                    ...state,                                                      
                       activities: state.activities.filter(a => a.id !== action.payload)                      
                };

     

        default: return {...state}
    }


}

export default rootReducer;