import { COUNTRIES_SEARCH, GET_COUNTRY_DETAIL, GET_COUNTRIES, POST_ACTIVITY, GET_ACTIVITIES, FILTER_BY_CONTINENT, FILTER_BY_ACTIVITY, SORT_COUNTRIES, SET_SORT_BY, DELETE_ACTIVITY } from "../Actions/actions-types";
import { applyFilters, sortCountriesByName, sortCountriesByPopulation } from "./utils";



let inicialState = {
    allCountries: [],
    allActivities: [],
    countryDetail: [],
    resultSearch: [],
    filteredCountries: [],
    filters: {
    continent: "",
    activity: "",
    sortOrder: "",
    sortBy: ""
    },
};


function rootReducer(state=inicialState, action){
    switch(action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                allCountries: action.payload,
                filteredCountries: action.payload,
                resultSearch: [],
            };
        
        case COUNTRIES_SEARCH:
            return {
                ...state,
                resultSearch: action.payload,
                filteredCountries: applyFilters(action.payload, state.filters),
            };
        
        
        
        case GET_COUNTRY_DETAIL:
            return {
                ...state,
                countryDetail: action.payload,
            };
     

          case POST_ACTIVITY:
              return {
                   ...state,
                    allActivities: [...state.allActivities, action.payload],
                };


        case GET_ACTIVITIES:
            return {
                ...state,
                allActivities: action.payload,
            };

         case DELETE_ACTIVITY:
            return {
                 ...state,
                 allActivities: [...state.allActivities].filter((activity) => activity.id !== action.payload),
             };
        
              
             case FILTER_BY_CONTINENT: {
                const updatedFilters = {
                    ...state.filters,
                    continent: action.payload,
                };
    
                const countriesToFilter = state.resultSearch.length > 0 ? state.resultSearch : state.allCountries;
                const filteredCountries = applyFilters(countriesToFilter, updatedFilters);
    
                return {
                    ...state,
                    filters: updatedFilters,
                    ...(state.resultSearch.length > 0 
                        ? { resultSearch: filteredCountries } 
                        : { filteredCountries: filteredCountries }
                    ),

                };
            }


         case FILTER_BY_ACTIVITY: {
                
                const updatedFilters = {
                  ...state.filters,
                  activity: action.payload,
                };
              
                
                let countriesToFilter = state.allCountries;
                if (state.resultSearch.length > 0) {
                  countriesToFilter = state.resultSearch;
                }
              
                
                const filteredCountries = applyFilters(countriesToFilter, updatedFilters);

              
                return {
                  ...state,
                  filters: updatedFilters,
                  ...(state.resultSearch.length > 0 
                    ? { resultSearch: filteredCountries } 
                    : { filteredCountries: filteredCountries }
                ),


                };
              }
            

            case SORT_COUNTRIES: {
                let sortedCountries = [];
                const countriesToSort = state.resultSearch.length > 0 ? state.resultSearch : state.filteredCountries;
    
                if (state.filters.sortBy === 'name') {
                    sortedCountries = sortCountriesByName([...countriesToSort], action.payload);
                } else if (state.filters.sortBy === 'population') {
                    sortedCountries = sortCountriesByPopulation([...countriesToSort], action.payload);
                } else {
                    sortedCountries = countriesToSort;
                }
    
                return {
                    ...state,
                    filters: {
                        ...state.filters,
                        sortOrder: action.payload,
                    },
                    ...(state.resultSearch.length > 0 
                        ? { resultSearch: sortedCountries } 
                        : { filteredCountries: sortedCountries }
                    ),
                };
            }

         case SET_SORT_BY:
                return {
                    ...state,
                    filters: {
                        ...state.filters,
                        sortBy: action.payload,
                    },
                };



        default:
            return {...state};
    }

}




export default rootReducer;






