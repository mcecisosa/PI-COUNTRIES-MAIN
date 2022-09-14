import { GET_ALL_COUNTRIES, GET_ALL_ACTIVITIES, FILTER_BY_CONTINENT, ORDER_BY_NAME } from "../actions/typeActions";

const initialState = {
    countries: [],
    activities: [],
    allCountries: []
}

const rootReducer = (state = initialState, action) => {

    switch(action.type){
        
        case GET_ALL_COUNTRIES: return {...state, countries: action.payload, allCountries: action.payload}

        case GET_ALL_ACTIVITIES: return {...state, activities: action.payload}

        case FILTER_BY_CONTINENT: 

                const allCountries = state.allCountries;
                const continentFilter = allCountries.filter(el => el.continent === action.payload)
                
                return {...state, countries: continentFilter}

        case ORDER_BY_NAME:

                if(action.payload === 'ascendente'){
                    var countrySorted = state.countries.sort(function(a,b){
                        if(a.name > b.name)  return 1;
                        if(b.name > a.name)  return -1;
                        return 0;
                    })
                }else if(action.payload === 'descendente'){
                    var countrySorted = state.countries.sort(function(a,b){
                        if(a.name > b.name)  return -1;
                        if(b.name > a.name)  return 1;
                        return 0;
                    })
                }
                return {...state, countries: countrySorted}


        default: return {...state}
    }


}

export default rootReducer;