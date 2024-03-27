import React from 'react'

import './HeroSection.jsx.css'
import { Link } from 'react-router-dom'

const HeroSection = ({title, subtitle, link, featuredImg}) => {
  return (
    <section className='hero row'>
      <div className="heroInfos col-lg-6">
        <h2>{title}</h2>
        <p>{subtitle}</p>
        <Link to={link}><button>BUY NOW</button></Link>
      </div>

      <img src={featuredImg} className='col-lg-6 img-fluid'/>
    </section>
  )
}

export default HeroSection
