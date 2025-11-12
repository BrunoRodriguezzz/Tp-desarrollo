import React, { useEffect, useState } from "react";
import "./CategoryList.css";
import CategoryBox from "../categoryBox/CategoryBox";
import categoriesMock from "../../../mockData/Categories";
import Pagination from "../../pagination/Pagination.jsx";
import PropTypes from "prop-types";
import SkeletonCategories from "../../skeletons/SkeletonCategories.jsx";
import { obtenerCategorias } from "../../../services/categoriaService.js";

export default function CategoryList({ limit = 6, pagination = true }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
      const fetch = async () => {
        try {
          setLoading(true);
          const data = await obtenerCategorias();
          setCategorias(data.categorias)
        } catch (error) {
          console.error("Error categorias obteniendo categorias:", error);
        } finally {
          setLoading(false);
        }
      };
      fetch();
    }, []);

  const totalPages = Math.ceil(categorias.length / limit);

  const startIdx = (currentPage - 1) * limit;
  const endIdx = startIdx + limit;

  const categoriesToShow = categorias.slice(startIdx, endIdx);

  return (
    <div>
      { loading ?
        <SkeletonCategories 
          cards={limit}
        />
        :
        <div className="category-list">
          {categoriesToShow.map((category, index) => (
            <CategoryBox key={index} category={category} />
          ))}
        </div>
      }
      {pagination && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(p) => setCurrentPage(p)}
        />
      )}
    </div>
  );
}

CategoryList.propTypes = {
  limit: PropTypes.number.isRequired,
  pagination: PropTypes.bool,
};
