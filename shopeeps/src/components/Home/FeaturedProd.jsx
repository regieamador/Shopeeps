import React, { useEffect, useState } from 'react'

import './FeaturedProd.css'
import FeaturedCard from './FeaturedCard'
import iPhone14 from '/iphone.jpg'
import apiClient from '../Utils/api-client'

const FeaturedProd = () => {
  const [products, setProducts] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    apiClient.get("/products", {params: {perPage: 6}})
    .then(res => setProducts(res.data.products)).catch(err => setError(err.message))
  }, [])


  return (
    <section className='feturedProds'>
        <h1 className='featureTitle'>Featured Products</h1>

        <div className='prodRow row justify-content-center'>
        {error && <em style={{ color: 'red' }} className='text-center'>{error}</em>}
        {products &&
          products.map(product => <FeaturedCard
            key={product._id} 
            product={product}
            />)
        }
            
        </div>
    </section>
  )
}

export default FeaturedProd
