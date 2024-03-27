import React from 'react'

import './SideBarProd.css'
import SideLinkItems from './SideLinkItems'
import useData from '../../hooks/useData'

const SideBarProd = () => {
  const {data: categories, error} = useData("/category")

  return (
    <div className='sidebar col-md-2'>
      <h3>Category</h3>

      <div className="sideLinks">
        {error && <em style={{ color: 'red' }} className='text-center'>{error}</em>}
        {
          categories && categories.map((category) => 
            <SideLinkItems 
            key={category._id}
            id={category._id}
            link={`/products?category=${category.name}`}
            categoryName={category.name} 
            icon={category.image}/>)
        }
      </div>
    </div>
  )
}

export default SideBarProd
