import React from 'react'

import './Products.css'
import SideBarProd from './SideBarProd'
import MainProdPage from './MainProdPage'

const Products = () => {
  return (
    <section className='products row' id='prod'>
        <SideBarProd />
        <MainProdPage />
    </section>
  )
}

export default Products
