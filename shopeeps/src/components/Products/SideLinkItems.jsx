import React from 'react'
import { Link } from 'react-router-dom'

const SideLinkItems = ({icon, categoryName, link}) => {
  return (
    <div className='sideLinkItems'>
        <Link to={link}><img src={`http://localhost:5000/category/${icon}`} className='sideIcon'/> {categoryName}</Link>
    </div>
  )
}

export default SideLinkItems
