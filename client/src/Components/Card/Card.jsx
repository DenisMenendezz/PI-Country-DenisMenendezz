import React from 'react'
import { Link } from "react-router-dom";
import styles from './Card.module.css';

const Card = (props) => {
  return (
    <div className={styles.card}>
    <Link className={styles.cardLink} to={`/detail/${props.id}`}>
      <div>
        <img src={props.flags} alt="flag" className={styles.img} />
        <div className={styles.cardContent}>
        <h2 className={styles.h2}>{props.name}</h2>
        <h3 className={styles.h3}>{props.continent}</h3>
        </div>
      </div>
    </Link>
    </div>
  );
}

export default Card