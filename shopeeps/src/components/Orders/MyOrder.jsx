import React, { useContext } from 'react'

import './MyOrder.css'
import Table from './../Common/Table';
import OrderContext from '../../Contexts/orderContext';
import useData from './../../hooks/useData';

const MyOrder = () => {
  const order = useContext(OrderContext)

  const getProductString = (order) => {
    return (
      <div>
        {order.products.map((p, index) => (
          <p key={p.product._id}>{`${p.product.title} (${p.quantity})`}</p>
        ))}
      </div>
    );
  };

  return (
    <section className="myOrder">
        <Table headings={["ORDER", "PRODUCTS", "TOTAL", "STATUS"]}>
            { order &&
              order.map((item, index) => (
                <tr className='tableRow' key={item._id}>
                  <td>{index + 1}</td>
                  <td>{getProductString(item)}</td>
                  <td>${Math.ceil(item.total)}</td>
                  <td>{item.status}</td>
                </tr>
              ))
            }
        </Table>
    </section>
  )
}

export default MyOrder
