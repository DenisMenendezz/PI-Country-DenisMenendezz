import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getActivities, postActivity, getCountries } from '../../Redux/Actions/actions';
import { Link } from "react-router-dom";
import styles from './Create.module.css';

const Create = () => {

  const dispatch = useDispatch()
  const allCountries = useSelector(state => state.allCountries);
  const allActivities = useSelector(state => state.allActivities);

  const [state, setState] = useState({
    name: "",
    difficulty: 1,
    duration: 1,
    season: "Summer",
    countries: [],
  });

  const [errors, setErrors] = useState({
    name:"name is required",
    duration: "",
    countries: "You must add at least 1 country",
  })
  
  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);


  const validate = (newState, name) => {
    const newErrors = { ...errors };

    if (name === "name") {
      const regex = /^[A-Za-z\s]+$/;
      if (newState.name === "") newErrors.name = "name is required";
      else if (newState.name.length > 25) newErrors.name = "The name is too long (limit 25 characters)";
      else if (!regex.test(newState.name)) newErrors.name = "The name must not contain special characters";
      else newErrors.name = "";
    }

    if (name === "duration") {
      if (newState.duration > 24) newErrors.duration = "The activity cannot last more than 24 hours";
      else if(newState.duration < 0) newErrors.duration = "You cannot enter negative numbers";
      else if(!newState.duration) newErrors.duration = "You must enter a duration in hours!";
      else newErrors.duration = "";
    }

    if(name === "countries") {
      if (newState.countries.length === 0) newErrors.countries = "You must add at least 1 country";
      else newErrors.countries = "";
    }

    setErrors(newErrors);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    let newValue = value;

  
    if (name === 'difficulty' || name === 'duration') {
      newValue = parseInt(value, 10);
    }

    setState((prevState) => {
      const newState = {
        ...prevState,
        [name]: newValue
      };

      validate(newState, name);
      return newState;
    });
  };



  const handleAddCountry = (e) => {
    setState((prevState) => {
      const newState = {
        ...prevState,
        countries: [...prevState.countries, e.target.value]
      };
      validate(newState, "countries");
      return newState;
    });
  };

  
  const handleDeleteCountry = (e, countryId) => {
    e.preventDefault();
    setState((prevState) => {
      const newState = {
        ...prevState,
        countries: prevState.countries.filter((id) => id !== countryId)
      };
      validate(newState, "countries");
      return newState;
    });
  };




  const disable = () => {
    for (let error in errors) {
      if (errors[error] !== "") return true;
    }
    return false;
  };


  const resetForm = () => {
    const resetState = {
      name: '',
      difficulty: 1,
      duration: 1,
      season: 'Summer',
      countries: [],
    };
    setState(resetState);
    setErrors({
      name: "name is required",
      duration: "",
      countries: "You must add at least 1 country",
    });
    dispatch(getActivities());
    dispatch(getCountries());
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postActivity(state))
      .then(() => {
        resetForm();
      })
      .catch(() => {
        resetForm();
      });
  };



  return (
    <div className={styles.pageContainer}>
    <div className={styles.formCont}>
      
      <Link to="/home" className={styles.homeLink}>
        <button className={styles.homeButton}>Home</button>
      </Link>

      <Link to="/delete" className={styles.homeLink}>
        <button className={styles.homeButton}>Delete activities</button>
        </Link>
        
      
      <form onSubmit={handleSubmit}>
        <div className={styles.formContCenter}>

         

        <h2>Create Activity</h2>

        <div className={styles.activitiesList}>
            <h3>Existing Activities:</h3>
            <ul>
              {allActivities.map((activity, idx) => (
                <li key={idx}>{activity.name}</li>
              ))}
            </ul>
          </div>

          <p>**Cannot create an existing activity**</p>
            

          <div className={styles.formGroup}>
          <label>Name: </label>
          <input value={state.name} onChange={handleChange} name='name' type='text'/>
          <label className={styles.formError}>{errors.name}</label>
          </div>

          <div className={styles.formGroup}>
          <label>Difficulty: </label>
          <select value={state.difficulty} onChange={handleChange} name='difficulty'>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          </div>

          <div className={styles.formGroup}>

          <label>Duration(hrs):</label>
          <input value={state.duration} onChange={handleChange} name='duration' min="1" type='number'/>
          <label className={styles.formError}>{errors.duration}</label>

          </div>

          <div className={styles.formGroup}>
          <label>Season: </label>
          <select value={state.season} onChange={handleChange} name='season'>
          <option value={"Summer"}>Summer</option>
          <option value={"Autumn"}>Autumn</option>
          <option value={"Winter"}>Winter</option>
          <option value={"Spring"}>Spring</option>
          </select>
          </div>


          <div className={styles.formGroup}>
          <label>Select activity countries: </label>
          <select name="countries" onChange={(e) => handleAddCountry(e)} defaultValue={'default'}>
            <option value={'default'} disabled>Select countries</option>
            {allCountries.map((country, idx) => (
              <option key={idx} value={country.id}>{country.name}</option>
            ))}
          </select>
          <label className={styles.formError}>{errors.countries}</label>
          </div>



          {state.countries.map((countryId, idx) => {
            const country = allCountries.find((country) => country.id === countryId);
            return (
              <div key={idx} className={styles.formGroup}>
                <p>{country ? country.name : countryId} <button className={styles.removeButton} onClick={(e) => handleDeleteCountry(e, countryId)}>Remove</button></p>
              </div>
            );
          })}

          


          <button className={styles.formButton} disabled={disable()} type='submit' >Create activity</button>


        </div>

      </form>
    </div>
    </div>
  )
}

export default Create;
