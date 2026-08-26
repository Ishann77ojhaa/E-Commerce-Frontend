import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  deleteProductFromCart,
  fetchCart,
  increaseQuantity,
} from "../../store/cartSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 fill-current inline"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z" />
    <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" />
  </svg>
);

const Cart = () => {
  const { items: products } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Remove invalid/stale cart items
  const validProducts = products.filter(
    (item) => item?.product
  );

  // Total items
  const totalItemsInCart = validProducts.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Subtotal
  const subtotal = validProducts.reduce(
    (total, item) =>
      total + item.product.Product_Price * item.quantity,
    0
  );

  // Shipping
  const shipping = subtotal > 1000 ? 0 : 100;

  // Total
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen pt-20 bg-gray-100">
      <h1 className="mb-10 text-2xl font-bold text-center">
        Cart Items
      </h1>

      <div className="justify-center max-w-5xl px-6 mx-auto md:flex md:space-x-6 xl:px-0">

        {/* ================= CART PRODUCTS ================= */}
        <div className="rounded-lg md:w-2/3">

          {validProducts.length > 0 ? (
            validProducts.map((item) => {
              const product = item.product;

              return (
                <div
                  key={product._id}
                  className="justify-between p-6 mb-6 bg-white rounded-lg shadow-md sm:flex sm:justify-start"
                >

                  {/* Product Image */}
                  <img
                    src={`http://${product.Product_Image}`}
                    alt={product.Product_Name}
                    className="w-full h-40 object-contain rounded-lg sm:w-40 bg-gray-50"
                  />

                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">

                    {/* Product Name */}
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900">
                        {product.Product_Name}
                      </h2>

                      <p className="mt-2 text-sm text-gray-500">
                        Rs. {product.Product_Price}
                      </p>
                    </div>

                    {/* Quantity + Price + Delete */}
                    <div className="flex justify-between mt-4 sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">

                      {/* Quantity */}
                      <div className="flex items-center border-gray-100">

                        <button
                          onClick={() =>
                            dispatch(
                              decreaseQuantity(product._id)
                            )
                          }
                          className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                        >
                          -
                        </button>

                        <input
                          className="w-8 h-8 text-xs text-center bg-white border outline-none"
                          type="number"
                          value={item.quantity}
                          readOnly
                          min="1"
                        />

                        <button
                          onClick={() =>
                            dispatch(
                              increaseQuantity(product._id)
                            )
                          }
                          className="px-3 py-1 duration-100 bg-gray-100 rounded-r cursor-pointer hover:bg-blue-500 hover:text-blue-50"
                        >
                          +
                        </button>

                      </div>

                      {/* Price + Delete */}
                      <div className="flex items-center space-x-4">

                        <p className="text-sm">
                          {(
                            product.Product_Price *
                            item.quantity
                          ).toLocaleString()}{" "}
                          Rs
                        </p>

                        <button
                          onClick={() =>
                            dispatch(
                              deleteProductFromCart(product._id)
                            )
                          }
                          className="text-gray-500 duration-150 cursor-pointer hover:text-red-500"
                          title="Remove product"
                        >
                          <TrashIcon />
                        </button>

                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-10 text-center bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-700">
                Your cart is empty
              </h2>

              <p className="mt-2 text-gray-500">
                Add some products to your cart.
              </p>

              <button
                onClick={() => navigate("/")}
                className="px-6 py-2 mt-5 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Continue Shopping
              </button>
            </div>
          )}

        </div>

        {/* ================= ORDER SUMMARY ================= */}
        <div className="h-full p-6 mt-6 bg-white border rounded-lg shadow-md md:mt-0 md:w-1/3">

          <div className="flex justify-between mb-2">
            <p className="text-gray-700">
              Total Items
            </p>

            <p className="text-gray-700">
              {totalItemsInCart}
            </p>
          </div>

          <div className="flex justify-between mb-2">
            <p className="text-gray-700">
              Subtotal
            </p>

            <p className="text-gray-700">
              Rs. {subtotal.toLocaleString()}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-700">
              Shipping
            </p>

            <p className="text-gray-700">
              {shipping === 0
                ? "FREE"
                : `Rs. ${shipping}`}
            </p>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between">

            <p className="text-lg font-bold">
              Total
            </p>

            <div>
              <p className="mb-1 text-lg font-bold">
                Rs. {total.toLocaleString()}
              </p>

              <p className="text-sm text-gray-700">
                including VAT
              </p>
            </div>

          </div>

          <button
            onClick={() => navigate("/checkout")}
            disabled={validProducts.length === 0}
            className={`mt-6 w-full rounded-md py-2 font-medium ${
              validProducts.length > 0
                ? "bg-blue-500 text-blue-50 hover:bg-blue-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Check out
          </button>

        </div>

      </div>
    </div>
  );
};

export default Cart;