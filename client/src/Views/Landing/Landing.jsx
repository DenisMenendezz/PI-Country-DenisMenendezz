import React from 'react'
import { Link } from "react-router-dom";
import styles from './Landing.module.css';


const Landing = () => {
  return (
    <div className={styles.landingContainer}>
      <h2 className={styles.title}>Explore the world</h2>
      <div className={styles.buttonContainer}>
        <Link to={"/home"}>
          <button className={styles.homeButton}>Home</button>
        </Link>
      </div>
      
    </div>
  )
}

export default Landing