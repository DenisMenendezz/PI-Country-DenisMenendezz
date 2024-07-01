import React from 'react'
import { useSelector, useDispatch} from "react-redux";
import { useEffect, useState } from 'react';
import Card from "../Card/Card.jsx";
import Pagination from "../../Components/Pagination/Pagination.jsx";
import styles from './Cards.module.css';

const Cards = () => {
  const filteredCountries = useSelector((state) => {
    return (state.resultSearch.length > 0 ? state.resultSearch : state.filteredCountries) || [];
  });

  const [paginaActual, setpaginaActual] = useState(1);
  const [paisesXPagina] = useState(10);

  useEffect(() => {
    setpaginaActual(1);
  },[filteredCountries]);

  const indexUltimoPais = paginaActual * paisesXPagina;
  const indexPrimerPais = indexUltimoPais - paisesXPagina;
  const actualesPaises = filteredCountries.slice(indexPrimerPais, indexUltimoPais);

  const numeroPaginas = Math.ceil(filteredCountries.length / paisesXPagina);

  const handlePageClick = (numeroPagina) => {
    setpaginaActual(numeroPagina);
  };

  return (
    <div>
      <div className={styles.cardsContainer}>
      {actualesPaises.map((country) => (
        <Card
          key={country.id}
          id={country.id}
          name={country.name}
          flags={country.flags}
          continent={country.continent}
          />
      ))}
      </div>

      <div className={styles.paginationContainer}>
      <Pagination
         paginaActual={paginaActual}
         paginasTotales={numeroPaginas}
         handlePageClick={handlePageClick}
         />
         </div>


    </div>
  );
};

export default Cards;