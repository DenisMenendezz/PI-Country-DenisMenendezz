import React from 'react'
import Cards from '../../Components/Cards/Cards'
import { filterByContinent, getActivities, filterByActivity, sortCountries, setSortBy, getCountries } from '../../Redux/Actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import styles from './Home.module.css'



const Home = () => {

  const dispatch = useDispatch();
  const allActivities = useSelector(state => state.allActivities);
  



  useEffect(() => {
    dispatch(getActivities());
    dispatch(getCountries())
  }, [dispatch]);


  const handleContinentFilter = (event) => {
    const continent= event.target.value;
    dispatch(filterByContinent(continent))
   };

   const handleActivityFilter = (event) => {
    const name = event.target.value;
    dispatch(filterByActivity(name));
  };


  const handleSortByName = (order) => {
    dispatch(setSortBy('name')); 
    dispatch(sortCountries(order));
  };


  const handleSortByPopulation = (order) => {
    dispatch(setSortBy('population'));
    dispatch(sortCountries(order));
  };



  
  return (
    <div className={styles.homeContainer}>
      <Navbar />

      <div className={styles.filtersAndSorts}>
        <div className={styles.filterSection}>
          <h3>Filter by Continent</h3>
          <select className={styles.select} onChange={handleContinentFilter}>
            <option value="">All Continents</option>
            <option value="Antarctic">Antarctic</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>

        <div className={styles.filterSection}>
          <h3>Filter by Activity Name</h3>
          <select className={styles.select} onChange={handleActivityFilter}>
            <option value="">All Activities</option>
            {allActivities.map((activity) => (
              <option key={activity.id} value={activity.name}>
                {activity.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.sortSection}>
          <h3>Order Countries</h3>
          <button className={styles.sortButton} onClick={() => handleSortByName('asc')}>Sort by Name Ascending</button>
          <button className={styles.sortButton} onClick={() => handleSortByName('desc')}>Sort by Name Descending</button>
          <button className={styles.sortButton} onClick={() => handleSortByPopulation('asc')}>Sort by Population Ascending</button>
          <button className={styles.sortButton} onClick={() => handleSortByPopulation('desc')}>Sort by Population Descending</button>
        </div>
      </div>

      <Cards />
    </div>
  );
}

export default Home;