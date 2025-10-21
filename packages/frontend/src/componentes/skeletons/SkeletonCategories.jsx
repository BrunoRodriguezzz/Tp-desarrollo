import React from 'react'
import Skeleton from '@mui/material/Skeleton';


export default function SkeletonCategories(data) {
    const skeletons = Array.from({ length: data.cards });
    return (
        <div
        style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", // ancho mínimo 200px
            gap: "16px",
            justifyContent: "center",
        }}
        >
        {skeletons.map((_, index) => (
            <Skeleton
            key={index}
            variant="rectangular"
            width={200}       // ancho mínimo
            height={190}      // igual que category-box
            sx={{
                borderRadius: "10px",
                boxSizing: "border-box",
            }}
            />
        ))}
        </div>
  )
}
