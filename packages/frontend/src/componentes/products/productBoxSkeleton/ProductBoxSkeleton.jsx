import React from 'react';
import "./ProductBoxSkeleton.css";
import Skeleton from '@mui/material/Skeleton';

export default function ProductBoxSkeleton() {
    return (
    <>
      <div
      className="product-box"
      style={{ cursor: "pointer" }}
    >
      <Skeleton variant="rectangular" className="product-image" sx={{minHeight:"14rem"}}/>
      <div className="product-content">
        <div className="product-text">
          <Skeleton variant="text" className="product-category" />
          <Skeleton variant="text" className="product-name" />
        </div>

        <div className="button-wrapper">
          <Skeleton variant="text" className="product-price" sx={{minWidth:"3rem"}} />
          <Skeleton variant="rectangular" className="add-to-cart-button" sx={{minWidth:"8rem", height:"1rem"}} />
        </div>
      </div>
    </div>
    </>
    );
}