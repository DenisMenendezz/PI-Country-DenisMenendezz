import React from 'react'
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom";
import { getCountries, searchCountries } from '../../Redux/Actions/actions';
import styles from './Navbar.module.css';

const Navbar = () => {
 const dispatch = useDispatch();


 const handleSearch = (event) => {
  const name = event.target.value;
  if(name) {
    dispatch(searchCountries(name));
  } else {
    dispatch(getCountries());
  }
 };


 
 
  return (
    <div className={styles.navbarContainer}>
      
      
        <Link to="/create">
          <button>Create Activity</button>
        </Link>
        
      

      <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder='Search Country'
        onChange={handleSearch}
        />
        </div>
    </div>
  )
}

export default Navbar