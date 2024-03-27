import React from 'react'

import './Home.css'
import iPhone14 from '/iphone-14-pro.webp'
import mac from '/mac-system-cut.jfif'
import HeroSection from './HeroSection'
import FeaturedProd from './FeaturedProd'

const Home = () => {
  return (
    <div className='home'>
      <HeroSection title='Buy Iphone 14 Pro' subtitle='Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur alias blanditiis repellendus, rerum doloribus odit.' featuredImg={iPhone14} link='/product/65e1dc08dccf867118999d9e'/>
      <FeaturedProd />
      <HeroSection title='Build The Ultimate Set Up' subtitle='Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur alias blanditiis repellendus, rerum doloribus odit.' featuredImg={mac} link='/product/65e1dc08dccf867118999da6'/>
    </div>
  )
}

export default Home
