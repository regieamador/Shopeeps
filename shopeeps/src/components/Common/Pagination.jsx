import React from 'react'

import './Pagination.css'

const Pagination = ({totalPost, postPerPage, onClick, currentPage}) => {
    let pages = []

    for(let i = 1 ; i <= Math.ceil(totalPost/postPerPage) ; i++){
        pages.push(i)
    }
    console.log(currentPage);
  return (
    <div>
        {pages.length > 1 && <ul className='pagination'>
            {
                pages.map(page =>
                <li key={page}>
                    <button className={parseInt(currentPage) === page ? 'paginationBtn pageActive' : 'paginationBtn'} onClick={() => onClick(page)}>
                        {page}
                    </button>
                </li>)
            }
        </ul>}
    </div>
  )
}

export default Pagination
