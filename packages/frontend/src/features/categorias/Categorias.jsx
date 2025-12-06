import React from 'react'
import CategoryList from '../../componentes/categories/categoryList/CategoryList'
import './Categorias.css'
import Seo from "../../componentes/seo/Seo";


export default function Categorias() {
  
  return (
    <div className='categoria-page'>
      <Seo
        title="Categorías | Tienda Sol"
        description="Explora todas las categorías y descubre productos pensados para vos. Filtrá por la categoría que más te guste."
      />
      <div className="categoria-content">
        <h1>Todas las categorías</h1>
        <p>¡Explora productos por categoría!</p>
        <CategoryList limit={15} pagination={true} />
      </div>
    </div>
  )
}