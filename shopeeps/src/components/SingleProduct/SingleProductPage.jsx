import React, { memo, useContext, useState } from 'react'

import './SingleProductPage.css'
import useData from './../../hooks/useData';
import { useNavigate, useParams } from 'react-router-dom';
import CartContext from '../../Contexts/cartContext';
import UserContext from '../../Contexts/userContext';


const SingleProductPage = () => {
    const [selectedImg, setSelectedImg]  = useState(0)
    const [quantity, setQuantity] = useState(1)
    const {id} = useParams()
    const navigate = useNavigate()

    const {data : product, error} = useData(`/products/${id}`, [])
    const {addToCart} = useContext(CartContext)
    const user = useContext(UserContext)


    const handleSelect = (index) => {
        setSelectedImg(index)
    }

    const handleSubtract = () => {
        if(quantity > 1){
            setQuantity(prev => prev - 1)
        }
    }

    const handleAdd = () => {
        if(quantity < product.stock){
            setQuantity(prev => prev + 1)
        }
    }

    const handleBack = () => {
        navigate(-1)
    }

  return (
    <section className='singleProduct row'>
        {error && <em style={{ color: 'red' }} className='text-center'>{error}</em>}
        {product && <>
        <div className="prodImages col-md-6">
            <div className='smallImg'>
                { 
                    product.images.map((image, index) => 
                        <img src={`http://localhost:5000/products/${product.images[index]}`} 
                        className={selectedImg === index ? "selected" : ""}
                        onClick={()=>handleSelect(index)} 
                        key={index}/>
                    )
                }
            </div>
            <div className='bigImg'>
                <img src={`http://localhost:5000/products/${product.images[selectedImg]}`} className='img-fluid' alt="product 1" />
            </div>
        </div>
        

        <div className="prodDetails col-md-6">
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <p><span>${product.price.toFixed(2)}</span></p>
            {user && 
                <>
                    <p><strong>Quantity</strong></p>
                    <div className='quantityBtn'>
                        <button onClick={handleSubtract}>-</button>
                        <p>{quantity}</p>
                        <button onClick={handleAdd}>+</button>
                    </div>
                    <button onClick={() => addToCart(product, quantity)} className='btn btn-primary btn-md mt-3'>Add to Cart</button>
                </>
            }
        </div>

        <i onClick={handleBack} class='bx bx-arrow-back backBtn'></i>
        </>}
    </section>
  )
}

export default memo(SingleProductPage)
