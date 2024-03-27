import React, { useEffect, useState } from 'react'
import apiClient from '../components/Utils/api-client'

const useData = (endPoint , customConfig, dependencies) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState("")
  
    useEffect(() => {
      apiClient
      .get(endPoint, customConfig)
      .then(res =>
        {if(endPoint == "/products" && data && data.products && customConfig.params.page !== 1){
          setData(prev => ({...prev, products: [...prev.products, ...res.data.products]}))
        }
        else{
          setData(res.data)
        }}
        )
      .catch(err => setError(err.message))
    }
    , dependencies ? dependencies : [])

    return {data, error}
}

export default useData
