
import {
  EyeIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { addToCart } from "../../../store/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";





const ProductActions = ({product}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleViewProduct = () => {
    navigate(`/productdetails/${product._id}`);
  };

  const handleAddToCart = () =>{
    dispatch(addToCart(product._id));
  }
  return (
    <div
      className="
        absolute
        inset-0
        flex
        items-center
        justify-center
        gap-3
        opacity-0
        group-hover:opacity-100
        transition-all
        duration-300
      "
    >
      {/* Background Overlay */}
      <div
        className="
          absolute
          inset-0
          bg-black/20
          backdrop-blur-[2px]
        "
      />

      {/* Buttons */}
      <div className="relative flex items-center gap-3">

 {/* Quick View */}
        <button
          type="button"
          onClick={handleViewProduct}
          className="
            w-11
            h-11
            rounded-full
            bg-white
            shadow-lg
            text-gray-700
            flex
            items-center
            justify-center
            hover:bg-indigo-600
            hover:text-white
            hover:scale-110
            transition-all
            duration-200
          "
          title="Quick View"
        >
        <EyeIcon className="w-5 h-5" />
      </button>


 {/* Add To Cart */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="
            w-11
            h-11
            rounded-full
            bg-white
            shadow-lg
            text-gray-700
            flex
            items-center
            justify-center
            hover:bg-indigo-600
            hover:text-white
            hover:scale-110
            transition-all
            duration-200
          "
          title="Add to Cart"
        >
          <ShoppingBagIcon className="w-5 h-5" />
        </button>

    </div>
    </div>
  );
};

export default ProductActions;
