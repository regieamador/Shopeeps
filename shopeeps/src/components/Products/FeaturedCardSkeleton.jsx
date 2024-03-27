import React from 'react'
import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css"
import './FeaturedCardSkeleton.css'

const FeaturedCardSkeleton = () => {
  return (
    <Skeleton className='col-md-3'/>
  )
}

export default FeaturedCardSkeleton
