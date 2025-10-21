import React, { useEffect, useState } from "react";
import "./CategoryList.css";
import CategoryBox from "../categoryBox/CategoryBox";
import categoriesMock from "../../../mockData/Categories";
import Pagination from "../../pagination/Pagination.jsx";
import PropTypes from "prop-types";
import SkeletonCategories from "../../skeletons/SkeletonCategories.jsx";

export default function CategoryList({ limit = 6, pagination = true }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); 
    
    return () => clearTimeout(timer);
  }, []);

  const totalPages = Math.ceil(categoriesMock.length / limit);

  const startIdx = (currentPage - 1) * limit;
  const endIdx = startIdx + limit;

  const categoriesToShow = categoriesMock.slice(startIdx, endIdx);

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
