import React from 'react'
import Skeleton from '@mui/material/Skeleton';

export default function ProductDetailSkeleton () {
  return (
    <div className="producto-detail-container">
        <Skeleton variant='rectangular' width="85%" height={450} style={{borderRadius: 10}}/>
      <div className="producto-info">
        <Skeleton variant='text' width="20%" height={30}/>
        <Skeleton variant='text' width="70%" height={50}/>
        <Skeleton variant='text' width="20%" height={40}/>

        <Skeleton variant='rectangular' width="85%" height={90} style={{borderRadius: 10}}/>

        <Skeleton variant='rectangular' width="85%" height={90} style={{borderRadius: 10}}/>

        <Skeleton variant='rectangular' width="85%" height={50} style={{borderRadius: 10}}/>
      </div>
    </div>
  );
}