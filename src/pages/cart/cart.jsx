import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  fetchCart,
  increaseQuantity,
} from "../../store/cartSlice";
import { useEffect } from "react";

const Cart = () => {
  const { items: products } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Checkout total
  const subtotal = products.reduce(
    (total, item) => total + item.product.Product_Price * item.quantity,
    0,
  );

  // Checkout shipping price
  const shipping = subtotal > 1000 ? 0 : 100;

  //checkout total price
  const total = subtotal + shipping;

  const totalItemsInCart = products.reduce(
    (total, item) => item.quantity + total,
    0,
  );

  return (
    <div className="min-h-screen pt-20 bg-gray-100">
      <h1 className="mb-10 text-2xl font-bold text-center">Cart Items</h1>
      <div className="justify-center max-w-5xl px-6 mx-auto md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {products.map((product) => {
            return (
              <div
                key={product.product._id}
                className="justify-between p-6 mb-6 bg-white rounded-lg shadow-md sm:flex sm:justify-start"
              >
                <img
                  src={product.product.productImage}
                  alt={product.product.Product_Name}
                  className="w-full rounded-lg sm:w-40"
                />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">
                      {product.product.Product_Name}
                    </h2>
                  </div>
                  <div className="flex justify-between mt-4 sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center border-gray-100">
                      <span
                        onClick={() =>
                          dispatch(decreaseQuantity(product.product._id))
                        }
                        className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                      >
                        {" "}
                        -{" "}
                      </span>
                      <input
                        className="w-8 h-8 text-xs text-center bg-white border outline-none"
                        type="number"
                        value={product.quantity}
                        readOnly
                        min="1"
                      />
                      <span
                        onClick={() =>
                          dispatch(increaseQuantity(product.product._id))
                        }
                        className="px-3 py-1 duration-100 bg-gray-100 rounded-r cursor-pointer hover:bg-blue-500 hover:text-blue-50"
                      >
                        {" "}
                        +{" "}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="text-sm">
                        {(
                          product.product.Product_Price * product.quantity
                        ).toLocaleString()}{" "}
                        Rs
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 duration-150 cursor-pointer hover:text-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="h-full p-6 mt-6 bg-white border rounded-lg shadow-md md:mt-0 md:w-1/3">
          <div className="flex justify-between mb-2">
            <p className="text-gray-700">Total-Items</p>
            <p className="text-gray-700">{totalItemsInCart}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">{subtotal}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">{shipping}</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold"> Rs. {total} only</p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
          <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
            Check out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
