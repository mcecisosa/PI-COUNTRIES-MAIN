import { GET_ALL_COUNTRIES, GET_ALL_ACTIVITIES } from "../actions/typeActions";

const initialState = {
    countries: [],
    activities: [],
}

const rootReducer = (state = initialState, action) => {

    switch(action.type){
        
        case GET_ALL_COUNTRIES: return {...state, countries: action.payload}

        case GET_ALL_ACTIVITIES: return {...state, activities: action.payload}

        default: return {...state}
    }


}

export default rootReducer;