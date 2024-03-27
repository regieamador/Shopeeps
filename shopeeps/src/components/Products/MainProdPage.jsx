import React, { useEffect, useState } from 'react'

import './MainProdPage.css'
import FeaturedCard from '../Home/FeaturedCard'
import useData from '../../hooks/useData'
import { useSearchParams } from 'react-router-dom'
import Pagination from '../Common/Pagination'


const MainProdPage = () => {
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState("")
  const [sortedProducts, setSortedProducts] = useState([])

  const [search, SetSearch] = useSearchParams()
  const category = search.get("category")
  const searchQuery = search.get("search")

  const {data, error} = useData("/products", 
    {params: {
      search: searchQuery,
      category: category,
      perPage: 6,
      page: page
    }}, [search, category, page])


    // PAGINATION
    const handlePageChange = (page) => {
      const currentParams = Object.fromEntries([...search])
      SetSearch({...currentParams, page: parseInt(currentParams.page) + 1})
    }

    //INFINITE SCROLLING
    useEffect(() => {
      const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    
        if (scrollTop + clientHeight >= scrollHeight - 1 && data && page < data.totalPages) {
          setPage((prev) => prev + 1);
        }
      };
    
      window.addEventListener("scroll", handleScroll);
    
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [data]);
    
    
    useEffect(() => {
      setPage(1)
    }, [category, searchQuery])

    useEffect(() => {
      if(data && data.products){
        const products = [...data.products]

        if(sortBy == "price desc"){
          setSortedProducts(products.sort((a,b) => b.price - a.price))
        }
        else if(sortBy == "price asc"){
          setSortedProducts(products.sort((a,b) => a.price - b.price))
        }
        else if(sortBy == "rate desc"){
          setSortedProducts(products.sort((a,b) => b.reviews.rate - a.reviews.rate))
        }
        else if(sortBy == "rate asc"){
          setSortedProducts(products.sort((a,b) => a.reviews.rate - b.reviews.rate))
        }
        else{
          setSortedProducts(products)
        }
      }
    }, [sortBy, data])

  return (
    <div className='mainProdPage col-md-10'>
      <div className='mainHeader'>
        <h1>Products</h1>

        <select name="sort" id="sortBy" onChange={e => setSortBy(e.target.value)}>
          <option value="">Relevance</option>
          <option value="price desc">Price HIGH to LOW</option>
          <option value="price asc">Price LOW to HIGH</option>
          <option value="rate desc">Rate HIGH to LOW</option>
          <option value="rate asc">Rate LOW to HIGH</option>
        </select>
      </div>

      <div className='row justify-content-center d-flex'>
        {error && <em style={{ color: 'red' }} className='text-center'>{error}</em>}
        { 
          data?.products &&
          sortedProducts.map(product => <FeaturedCard
            key={product._id} 
            product={product}
            />)
        }
      </div>

      {/* {data && 
        <Pagination 
          totalPost={data.totalProducts} 
          postPerPage={8} 
          onClick={handlePageChange}
          currentPage={page}
        />}  */}
    </div>
  )
}

export default MainProdPage
