import React from "react";
import PropTypes from "prop-types";
import "./Pagination.css";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const goPrev = () => onPageChange(Math.max(currentPage - 1, 1));
  const goNext = () => onPageChange(Math.min(currentPage + 1, totalPages));

  return (
    <div className="pagination">
      <button
        className="button-transparent-border-black"
        onClick={goPrev}
        disabled={currentPage === 1}
      >
        Anterior
      </button>

      <span>
        Página {currentPage} de {totalPages}
      </span>

      <button
        className="button-transparent-border-black"
        onClick={goNext}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
