import { useNavigate } from "react-router-dom";
import ProductActions from "./ProductActions";
import Rating from "./Rating";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../store/cartSlice";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleViewProduct = () => {
    navigate(`/productdetails/${product._id}`);
  };

  function handleAddToCart(){
    dispatch(addToCart(product._id))
  }

  return (
    <div
      className="
        group
        bg-white
        rounded-2xl
        shadow-md
        overflow-hidden
        transform
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-xl
      "
    >
      {/* ================= IMAGE ================= */}
      <div className="relative overflow-hidden">
        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 z-10 px-3 py-1 text-xs font-medium rounded-full ${
              product.badge === "Sale"
                ? "bg-red-100 text-red-700"
                : "bg-indigo-100 text-indigo-700"
            }`}
          >
            {product.badge}
          </span>
        )}

        <img
          src={`https://iecomifybackend.onrender.com/${product.Product_Image}`}
          alt={product.Product_Name}
          className="
            w-full
            h-64
            object-cover
            object-top
            cursor-pointer
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />

        {/* KEEPING YOUR EXISTING HOVER ACTIONS */}
        <ProductActions product={product}/>
      </div>

      {/* ================= PRODUCT INFO ================= */}
      <div className="p-5">
        {/* Product Name */}
        <h3
          onClick={handleViewProduct}
          className="
            text-xl
            font-semibold
            text-gray-800
            cursor-pointer
            hover:text-indigo-600
            transition-colors
            line-clamp-1
          "
        >
          {product.Product_Name}
        </h3>

        {/* Rating */}
        <div className="flex items-center mt-2">
          <Rating rating={product.rating || 0} />

          <span className="text-xs text-gray-500 ml-1">
            ({product.reviews || 0})
          </span>
        </div>

        {/* Price + Status */}
        <div className="flex justify-between items-center mt-3">
          <p className="text-indigo-600 font-bold">
            Rs. {product.Product_Price}
          </p>

          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              product.Product_Status === "Available"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {product.Product_Status}
          </span>
        </div>

        {/* Add To Cart */}
        <button
        onClick={handleAddToCart}
          className="
    mt-4 w-full
    bg-teal-500
    text-white
    py-2.5 px-4
    rounded-lg
    font-medium
    hover:bg-teal-600
    transition-colors
  "
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
