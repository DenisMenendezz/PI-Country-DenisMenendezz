import React from "react";
import styles from './Pagination.module.css';

const Pagination = ({ paginaActual, paginasTotales, handlePageClick }) => {
    const limitePagina = 2;
    const numeroDePaginas = [];

    let paginaInicial = Math.max(paginaActual - limitePagina, 1);

    let paginaFinal = Math.min(paginaActual + limitePagina, paginasTotales);

    for (let i = paginaInicial; i <= paginaFinal; i++) {
        numeroDePaginas.push(i);
    }

    const handlePrevClick = () => {
        if (paginaActual > 1) {
            handlePageClick(paginaActual - 1);
        }
    };

    const handleNextClick = () => {
        if (paginaActual < paginasTotales) {
            handlePageClick(paginaActual + 1);
        }
    };

return (
    <div className={styles.paginationContainer}>
        <button className={styles.paginationButton} onClick={handlePrevClick} disabled={paginaActual == 1}>
            Prev
        </button>
        {paginaInicial > 1 && <button className={styles.paginationButton} onClick={() => handlePageClick(1)}>1</button>}
        {paginaInicial > 2 && <span className={styles.paginationEllipsis}>...</span>}
        {numeroDePaginas.map((number) => (
            <button 
            key={number}
            className={`${styles.paginationButton} ${paginaActual === number ? styles.active : ""}`}
            onClick={() => handlePageClick(number)}>
             {number}
             </button>
        ))}
        {paginaFinal < paginasTotales - 1 && <span className={styles.paginationEllipsis}>...</span>}
        {paginaFinal < paginasTotales && (
            <button className={styles.paginationButton} onClick={() => handlePageClick(paginasTotales)}>
                {paginasTotales}
                </button>
        )}
        <button className={styles.paginationButton} onClick={handleNextClick} disabled={paginaActual == paginasTotales}>
            Next
        </button>
    </div>
);
};


export default Pagination;