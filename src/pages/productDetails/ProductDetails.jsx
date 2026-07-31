import React from 'react'

import Review from './components/review/Review'
import Sproduct from './components/product/sproduct'
import { useParams } from 'react-router-dom'


const ProductDetails = () => {
  const {id} = useParams()
  console.log(id)
  return (
    <>
    <Sproduct id = {id}/>
    <Review />
    </>
    
  )
}

export default ProductDetails