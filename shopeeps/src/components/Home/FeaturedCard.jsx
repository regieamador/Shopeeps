import React, { memo, useContext } from 'react'

import './FeaturedCard.css'
import { NavLink } from 'react-router-dom'
import CartContext from '../../Contexts/cartContext'
import UserContext from '../../Contexts/userContext'

const FeaturedCard = ({product}) => {
    const {addToCart} = useContext(CartContext)
    const user = useContext(UserContext)

  return (
    <div className='col-md-3 prodCol mx-2 mb-5'>
        <div className="card cardFeutured">
            <div>
                <NavLink to={`/product/${product?._id}`}>
                    <img src={`http://localhost:5000/products/${product?.images[0]}`} className='img-fluid prodPic'/>
                </NavLink>                
            </div>

            <div className="featuredCardInfos">
                <h5>${product?.price}</h5>
                <p>{product?.title}</p>

                <div className='cardFooter'>
                    <div className='footerLeft'>
                        <div className='starDiv'>
                            <span><i className="bi bi-star-fill"></i> {product?.reviews.rate}</span>
                        </div>
                        <p className='totalSold'>{product?.stock}</p>
                    </div>

                    {product?.stock > 0 && user && <img onClick={() => addToCart(product, 1)} src="basket.png" className='img-fluid cardCart' width='50px'/>}
                </div>
            </div>
        </div>
    </div>
  )
}

export default memo(FeaturedCard)
