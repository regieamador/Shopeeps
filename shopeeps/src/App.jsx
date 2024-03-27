import React, { useCallback, useEffect, useState } from 'react'
import "./App.css"
import { ToastContainer, toast} from 'react-toastify'

import OrderContext from './Contexts/orderContext'
import CartContext from './Contexts/cartContext'
import UserContext from './Contexts/userContext'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Routing from './components/Routing/Routing'
import { getJwt, getUser } from './services/userServices'
import setAuthToken from './components/Utils/setAuthToken'
import { addToCartAPI, decreaseProductAPI, getCartAPI, increaseProductAPI, removeFromCartAPI } from './services/cartServices'
import 'react-toastify/dist/ReactToastify.css'
import { getOrderAPI } from './services/orderServices'

setAuthToken(getJwt())

const App = () => {
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])
  const [order, setOrder] = useState([])

  useEffect(() => {
    if(user){
      getOrderAPI().then(res => setOrder(res.data))
      .catch(err => {
        toast.error("Something went wrong!")
      })
    }
  }, [user, order])


  useEffect(() => {
    try {
      const jwtUser = getUser()
      if(Date.now() >= jwtUser.typ * 1000){
        localStorage.removeItem("token")
        location.reload()
      }else{
        setUser(jwtUser);
      }

    } catch (error) {}

  }, [])

  const addToCart = useCallback((product, quantity) => {
    const updatedCart = [...cart]
    //findIndex gets the index of the selected item and return -1 if its not true and if true return its index
    const productIndex = updatedCart.findIndex((item) => item.product._id === product._id)

    if(productIndex === -1){
      updatedCart.push({product: product, quantity: quantity})
    }
    else{
      updatedCart[productIndex].quantity += quantity
    }

    setCart(updatedCart)

    addToCartAPI(product._id, quantity)
    .then(res => {
      toast.success("Product Added Sucessfully")
    })
    .catch(err => {
      toast.error("Failed to Add Product")
      setCart(cart)
    })
  }, [cart])

  const getCart = useCallback(() => {
    getCartAPI().then(res => {
      setCart(res.data)
    }).catch(err => {
      toast.error("Something went wrong!")
    })
  }, [user])

  useEffect(() => {
    if(user){
      getCart()
    }

  }, [user])


  const removeFromCart = useCallback((id) => {
    const oldCart = [...cart]
    const newCart = oldCart.filter(item => item.product._id !== id)

    setCart(newCart)

    removeFromCartAPI(id).then(res => {
      toast("Product removed from cart!")
    }).catch(err => {
      toast.error("Something went wrong!")
      setCart(oldCart)
    })
  }, [cart])

  const updateCartQuantity = useCallback((type, id) => {
    const oldCart = [...cart]
    const updatedCart = [...cart]
    const productIndex = updatedCart.findIndex(item => item.product._id === id)

    if(type === 'increase'){
      if(updatedCart[productIndex].product.stock > updatedCart[productIndex].quantity){
        updatedCart[productIndex].quantity += 1
        setCart(updatedCart)

        increaseProductAPI(id).catch(err => {
          toast.error("Something went wrong!")
          setCart(oldCart)
        })
      }
    }
    else{
      if(updatedCart[productIndex].quantity > 1){
        updatedCart[productIndex].quantity -=1
        setCart(updatedCart)

        decreaseProductAPI(id).catch(err => {
          toast.error("Something went wrong!")
          setCart(oldCart)
        })
      }
    }
    
  }, [cart])

  return (
    <div className='app'>

      <UserContext.Provider value={user}>
        <CartContext.Provider value={{cart, addToCart, removeFromCart, updateCartQuantity, setCart}}>
          <OrderContext.Provider value={order}>

            <Navbar/>

            <section className='main'>
              <ToastContainer />
              <Routing />
            </section>

          </OrderContext.Provider>
        </CartContext.Provider>
      </UserContext.Provider>

    </div>
  )
}

export default App
