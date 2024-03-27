import React, { memo, useContext, useMemo } from 'react'

import UserContext from '../../Contexts/userContext'
import './CartPage.css'
import Table from '../Common/Table'
import CartContext from '../../Contexts/cartContext'
import { checkoutAPI } from '../../services/orderServices'
import { toast } from 'react-toastify'

const CartPage = () => {
    const user = useContext(UserContext)
    const {cart, removeFromCart, updateCartQuantity, setCart} = useContext(CartContext)

    const subTotal = useMemo(() => {
        let total = 0
        cart.forEach(item => {
            total += item.product.price * item.quantity
        })

        return total
    }, [cart])


    const checkout = () => {
        const oldCart = [...cart]
        checkoutAPI().then((res) => {
            toast.success("Order placed successfully!")
            setCart([])
        }).catch((err) => {
            toast.error("Something went wrong!")
            setCart(oldCart)
        })
    }
    
  return (
    <section className='cartPage'>
        <div className='user'>
            <img src={`http://localhost:5000/profile/${user?.profilePic}`} alt="User Picture" />
            <div>
                <h5>Name: {user?.name}</h5>
                <h6>Email: {user?.email}</h6>
            </div>
        </div>

        <div className='tableDiv'>
            <Table headings={["Item", "Price", "Quantity", "Total", "Remove"]}>
                {
                    cart.map(item => (
                        <tr key={item.product._id}>
                            <td>{item.product.title}</td>
                            <td>${item.product.price}</td>
                            <td className='countBtn'>                       
                                    <button onClick={() => updateCartQuantity("decrease", item.product._id)}>-</button>
                                    <p>{item.quantity}</p>
                                    <button onClick={() => updateCartQuantity("increase", item.product._id)}>+</button>                     
                            </td>
                            <td>${item.product.price * item.quantity}</td>
                            <td>
                                <img 
                                onClick={() => removeFromCart(item.product._id)} 
                                src="remove.png" 
                                className='removeIcon' 
                                alt="trash icon" />
                            </td>
                        </tr>
                    ))
                }
            </Table>
        </div>

        <div className='tables'>
            <table className='tableRight'>
                <tr>
                    <th>Description</th>
                    <td>Price</td>
                </tr>
                <tr>
                    <th>Subtotal</th>
                    <td>${subTotal}</td>
                </tr>
                <tr>
                    <th>Shipping Charge</th>
                    <td>$5</td>
                </tr>
                <tr>
                    <th>Final Total</th>
                    <td>${subTotal + 5}</td>
                </tr>

                <button onClick={checkout} className='btn btn-primary btn-md mt-3'>CheckOut</button>
            </table>
        </div>
    </section>
  )
}

export default memo(CartPage)
