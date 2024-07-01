import React from 'react'
import { Link } from "react-router-dom";
import styles from './DetailBody.module.css';

const DetailBody = (props) => {
 const { countryDt } = props;
 
 
  return (
    <div className={styles.detailContainer}>

        <div className={styles.homeButtonContainer}>
            <Link to="/home">
                <button className={styles.homeButton}>Home</button>
            </Link>
        </div>

        {countryDt.map((country) => (
            <div className={styles.countryDetail} key={country.id}>
                <h3>ID: {country.id}</h3>
                <h2>Name: {country.name}</h2>
                <img src={country.flags} alt={country.name} />
                <h3>Continent: {country.continent}</h3>
                <h3>Capital: {country.capital}</h3>
                <h3>Subregion: {country.subregion}</h3>
                <h3>Area: {country.area}</h3>
                <h3>Population: {country.population} inhabitants</h3>

            </div>
        ))}
        
    </div>
  )
}

export default DetailBody;