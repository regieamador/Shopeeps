import React from 'react'

import './Table.css'
const Table = ({headings, children}) => {
  return (
    <table className='tableCommon'>
        <tr>
            {headings.map((head, index) => <th key={index}>{head}</th>)}
        </tr>
        {children}
    </table>
  )
}

export default Table
