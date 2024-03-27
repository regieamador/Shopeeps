import React, { useContext, useEffect, useState } from "react";

import "./Navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserContext from "../../Contexts/userContext";
import CartContext from "../../Contexts/cartContext";
import { getSuggestionsApi } from "../../services/productServices";

const Navbar = () => {
  const [search, setSeacrh] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [selectedItem, setSelectedItem] = useState(-1)

  const navigate = useNavigate()
  const user = useContext(UserContext)
  const {cart} = useContext(CartContext)

  useEffect(() => {
    const delaySuggestions = setTimeout(() => {
      if(search.trim() !== "") {
        getSuggestionsApi(search).then(res => setSuggestions(res.data))
        .catch(err => console.log(err))
      }else{
        setSuggestions([])
      }

    }, 300)

    return () => clearTimeout(delaySuggestions)
  }, [search])


  const handleSubmit = (e) => {
    e.preventDefault()
    if(search.trim() !== ""){
      navigate(`/products?search=${search.trim()}`)
    }
    setSuggestions([])
  }

  const handleKeyDown = (e) => {
    if(selectedItem < suggestions.length){

      if(e.key === "ArrowDown"){
        setSelectedItem(prev => prev === suggestions.length - 1 ? 0 : prev + 1)
      }
      else if(e.key === "ArrowUp"){
        setSelectedItem(prev => prev === 0 ? suggestions.length - 1 :prev - 1)
      }
      else if(e.key === "Enter" && selectedItem > -1){
        const suggestion = suggestions[selectedItem]
        navigate(`/products?search=${suggestion.title}`)
        setSeacrh("")
        setSuggestions([])
      }

    }
    else{
      selectedItem(-1)
    }
  }

  return (
    <nav className="navbar">

      <div className="navBrandSearch">
        <h3>Sho<span>Peeps</span></h3>
        <form className="searchForm" onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Search Products"
            className="searchInput"
            value={search}
            onChange={e => setSeacrh(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="btn btn-primary searchBtn">Search</button>

          {suggestions.length > 0 && 
            <ul className="searchResult">
              {suggestions.map((suggestion, index) => 
                <li className={selectedItem === index ? "searchResultLink activesuggestion" : "searchResultLink"} key={suggestion._id}>
                  <Link onClick={() => {
                    setSeacrh("")
                    setSuggestions([])
                  }} to={`/products?search=${suggestion.title}`}
                  >
                    {suggestion.title}
                  </Link>
                </li>
              )}
            </ul>
          }

        </form>
      </div>

      <div className="nav-links">
        <div className="nav-items">
          <NavLink to="/">Home <img src='rocket.png' alt="" /></NavLink>
        </div>
        <div className="nav-items">
          <NavLink to="/products">Products <img src='glowing-star.png' alt="" /></NavLink>
        </div>
        {!user && <>
          <div className="nav-items">
            <NavLink to="/login">LogIn <img src='id-button.png' alt="" /></NavLink>
          </div>
          <div className="nav-items">
            <NavLink to="/signup">SignUp <img src='memo.png' alt="" /></NavLink>
          </div>
        </>}
        {user && <>
          <div className="nav-items">
            <NavLink to="/myorders">My Orders <img src='package.png' alt="" /></NavLink>
          </div>
          <div className="nav-items">
            <NavLink to="/logout">LogOut <img src='locked.png' alt="" /></NavLink>
          </div>
          <div className="nav-items">
            <NavLink to="/cart" className="carts">Cart<p className="cartCount">{cart.length}</p></NavLink>
          </div>
        </>}
      </div>

    </nav>
  );
};

export default Navbar;
