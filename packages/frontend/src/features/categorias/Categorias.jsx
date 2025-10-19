import React from 'react'
import CategoryList from '../../componentes/categories/categoryList/CategoryList'
import './Categorias.css'


export default function Categorias() {
  return (
    <div className='categoria-page'>
      <div className="categoria-content">
        <h1>Todas las categorías</h1>
        <p>¡Explora productos por categoría!</p>
        <CategoryList limit={15} pagination={true} />
      </div>
    </div>
  )
}