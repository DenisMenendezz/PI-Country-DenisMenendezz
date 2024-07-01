import axios from "axios";
import { FILTER_BY_CONTINENT, GET_ACTIVITIES, GET_COUNTRIES, GET_COUNTRY_DETAIL, POST_ACTIVITY, FILTER_BY_ACTIVITY, SORT_COUNTRIES, SET_SORT_BY, DELETE_ACTIVITY} from "./actions-types";
import { COUNTRIES_SEARCH } from "./actions-types";





export function getCountries() {
    return async function (dispatch) {
        try {
            const res = await axios.get("/countries");
            dispatch({type: GET_COUNTRIES, payload: res.data });
        } catch (error) {
            const errorMessage = error.response + ". An error has occurred, please try again."
            throw new Error(errorMessage);
        }
    };
}


export function searchCountries(searchTerm) {
    return async function(dispatch) {
        try {
            const res = await axios.get(`/countries?name=${searchTerm}`);
            dispatch({ type: COUNTRIES_SEARCH, payload: res.data })
        } catch (error) {
            const errorMessage = error.response + ". An error has occurred, please try again."
            throw new Error(errorMessage);
        }
    };
};




export function getCountryDetail(id) {
    
    return async function (dispatch) {
        try {
            const res = await axios.get(`/countries/${id}`);
            dispatch({type: GET_COUNTRY_DETAIL, payload: res.data });
        } catch (error) {
            const errorMessage = error.response + ". An error has occurred, please try again."
            throw new Error(errorMessage);
        }
    }
}


export const postActivity = (activity) => {
    return async function (dispatch) {
        try {
            const res = await axios.post("/activities", activity);
            dispatch({type: POST_ACTIVITY, payload: res.data});
            alert("Your activity has been created successfully!")
        } catch (error) {
            alert("There was an error creating your activity :(")
            const errorMessage = error.response.data + ". An error has occurred, please try again."
            throw new Error(errorMessage);
        }
    }
};

export const getActivities = () => {
    return async function (dispatch) {
        try {
            const res = await axios.get("/activities");
            dispatch({type: GET_ACTIVITIES, payload: res.data});
        } catch (error) {
            const errorMessage = error.response + ". An error has occurred, please try again."
            throw new Error(errorMessage);
        }
    }
};

export const deleteActivity = (id) => {
    return async function (dispatch) {
      try {
        const res = await axios.delete(`/activities/${id}`);
        dispatch({ type: DELETE_ACTIVITY, payload: res.data });
        alert("Your activity has been successfully deleted!")
      } catch (error) {
        alert("There was an error delete your activity :(")
        const errorMessage =
          error.response + ", Please contact the administrator/support";
        throw new Error(errorMessage);
      }
    };
  };


export const filterByContinent = (continent) => {
    return {
      type: FILTER_BY_CONTINENT,
      payload: continent,
    };
  };


  export const filterByActivity = (activityName) => {
    return {
      type: FILTER_BY_ACTIVITY,
      payload: activityName,
    };
  };

  export const sortCountries = (order) => {
    return {
        type: SORT_COUNTRIES,
        payload: order,
    };
};

export const setSortBy = (sortBy) => {
    return {
        type: SET_SORT_BY,
        payload: sortBy,
    };
};

