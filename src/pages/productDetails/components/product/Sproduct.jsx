import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductDetails } from '../../../../store/productSlice'

const Sproduct = ({id:productId}) => {
  const dispatch = useDispatch()

  const {selectedProduct, status} = useSelector(
    (state)=>state.product
  );

  const product = selectedProduct?.product?.[0];
  const reviews = selectedProduct?.productReviews;


  useEffect(()=>{
    if (productId) {
      dispatch(fetchProductDetails(productId));
    }
  },[dispatch, productId])

  if (status === "loading") {
  return (
    <div className="text-center py-20 text-lg font-medium">
      Loading Product...
    </div>
  );
}
if (status === "failed") {
  return (
    <div className="text-center py-20 text-red-500 font-medium">
      Failed to load product.
    </div>
  );
}

  return (
   
  <section className="text-gray-700 body-font overflow-hidden bg-white">
  <div className="container px-5 py-24 mx-auto">
    
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <img alt= {product?.Product_Name}
      className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" 
      src={product?.Product_Image || "/no-image.png"}/>

      <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h2 className="text-sm font-medium tracking-widest uppercase text-red-500">
  Brand
</h2>
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product?.Product_Name}</h1>
        <div className="flex mb-4">
          <span className="flex items-center">
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <span className="text-gray-600 ml-3">
  {reviews?.length || 0} Reviews
</span>
          </span>
        </div>
        <p className="leading-relaxed">{product?.Product_Description}</p>
        <div className="mt-5">
  <span className="font-semibold text-gray-800">Status : </span>
  <span
    className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${
      product?.Product_Status === "Available"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {product?.Product_Status}
  </span>
</div>
<div className="mt-5">
  <span className="font-semibold text-gray-800">Stock : </span>

  <span
    className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${
      product?.Product_StockQTY > 0
        ? "bg-blue-100 text-blue-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {product?.Product_StockQTY > 0
      ? `${product.Product_StockQTY} Available`
      : "Out of Stock"}
  </span>
</div>
        <div className="flex">
          <span className="title-font font-medium text-2xl text-gray-900"> Rs.{product?.Product_Price}</span>
          <button
  className="flex ml-auto text-white bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg transition duration-200"
>
  Add to Cart
</button>
          {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
            </svg>
          </button> */}
        </div>
      </div>
    </div>
  </div>
</section>
)}

export default Sproduct