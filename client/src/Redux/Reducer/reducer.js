import { COUNTRIES_SEARCH, GET_COUNTRY_DETAIL, GET_COUNTRIES, POST_ACTIVITY, GET_ACTIVITIES, FILTER_BY_CONTINENT, FILTER_BY_ACTIVITY, SORT_COUNTRIES, SET_SORT_BY, DELETE_ACTIVITY } from "../Actions/actions-types";



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
                allCountries: state.allCountries.map((country) => {
                    if(country.id === action.payload.id) {
                        return {
                            ...country,
                            allActivities: [...country.activities, action.payload],
                        };
                    } else {
                        return country;
                    }
                }),
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
              
                
                let countriesToFilter = state.allCountries;
                if (state.resultSearch.length > 0) {
                  countriesToFilter = state.resultSearch;
                }
              
                
                const filteredCountries = applyFilters(countriesToFilter, updatedFilters);
              
                return {
                  ...state,
                  filters: updatedFilters,
                  filteredCountries: filteredCountries,
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
                  filteredCountries: filteredCountries,
                };
              }

         case SORT_COUNTRIES:
                let sortedCountries = [];

            if (state.filters.sortBy === 'name') {
                sortedCountries = sortCountriesByName([...state.filteredCountries], action.payload);
            }
            
            else if (state.filters.sortBy === 'population') {
                sortedCountries = sortCountriesByPopulation([...state.filteredCountries], action.payload);
            } 
            
            else {
                sortedCountries = state.filteredCountries;
            }

            return {
                ...state,
                filters: {
                    ...state.filters,
                    sortOrder: action.payload,
                },
                filteredCountries: sortedCountries,
            };

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

function applyFilters(countries, filters) {
    let filtered = countries;
  
    if (filters.continent) {
      filtered = filtered.filter((country) => country.continent === filters.continent);
    }
  
    if (filters.activity) {
      filtered = filtered.filter((country) =>
        country.activities.some((activity) => activity.name === filters.activity)
      );
    }
  
    return filtered;
  }

  const sortCountriesByName = (countries, order) => {
    return countries.sort((a, b) => {
        if (order === 'asc') {
            return a.name.localeCompare(b.name);
        } else {
            return b.name.localeCompare(a.name);
        }
    });
};

const sortCountriesByPopulation = (countries, order) => {
  return countries.sort((a, b) => {
      if (order === 'asc') {
          return a.population - b.population;
      } else {
          return b.population - a.population;
      }
  });
};




export default rootReducer;








