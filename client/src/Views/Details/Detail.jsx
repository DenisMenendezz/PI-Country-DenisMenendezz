import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from "react-redux"
import { useParams } from "react-router-dom"
import { getCountryDetail } from '../../Redux/Actions/actions';
import DetailBody from "../../Components/detailComponent/DetailBody.jsx";

const Detail = () => {
  const dispatch = useDispatch();
  const countryDt = useSelector((state) => state.countryDetail);
  const { id } = useParams();



  useEffect(() => {
    dispatch(getCountryDetail(id));
  },[dispatch]);


  return (
    <div>
      <DetailBody
      countryDt={countryDt}
       />
    </div>
  )
}

export default Detail