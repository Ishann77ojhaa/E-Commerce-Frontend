
import Sproduct from './components/product/Sproduct'
import Review from './components/review/Review'

import { useParams } from 'react-router-dom'


const ProductDetails = () => {
  const {id} = useParams()
  return (
    <>
    <Sproduct id = {id}/>
    <Review />
    </>
    
  )
}

export default ProductDetails