import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react'
import { getActivities, deleteActivity} from '../../Redux/Actions/actions'
import styles from './Delete.module.css';
import { Link } from "react-router-dom";




const DeleteActivity = () => {

  const dispatch = useDispatch()
  const allActivities = useSelector(state => state.allActivities);
  


  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);



  const handleDelete = (activityId) => {
    dispatch(deleteActivity(activityId))
      .then(() => dispatch(getActivities()));
  };

  



    

  return (
    <div className={styles.deleteActivityContainer}>
        <Link to="/home" className={styles.homeLink}>
        <button className={styles.homeButton}>Home</button>
        </Link>

        <div className={styles.contentList}>

            <h3>Existing Activities:</h3>
            <ul>
              {allActivities.map((activity, idx) => (
                <li key={idx}>
                    {activity.name}
                    <button className={styles.deleteButton} onClick={() => handleDelete(activity.id)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
    </div>
  )
}

export default DeleteActivity