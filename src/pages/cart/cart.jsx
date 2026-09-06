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
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M12 23.5C18.0748 23.5 23 18.5748 23 12.5C23 6.42525 18.0748 1.5 12 1.5C5.92525 1.5 1 6.42525 1 12.5C1 18.5748 5.92525 23.5 12 23.5Z"
      stroke="#CCCCCC"
      strokeMiterlimit="10"
    />

    <path
      d="M16 8.5L8 16.5"
      stroke="#666666"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <path
      d="M16 16.5L8 8.5"
      stroke="#666666"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Cart = () => {
  const { items: products } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Remove invalid/stale products
  const validProducts = products.filter(
    (item) => item?.product
  );

  // Total quantity
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

  // Final total
  const total = subtotal + shipping;

  return (
    <section className="w-full bg-gray-50 py-10 px-4 sm:px-8 min-h-screen">

      {/* ================= HEADER ================= */}
      <h1 className="text-center text-3xl font-semibold text-gray-900">
        My Shopping Cart
      </h1>

      <div className="max-w-7xl mx-auto mt-8">

        {/* ================= CART + SUMMARY ================= */}
        <div className="flex flex-col xl:flex-row items-start gap-6">

          {/* ================= CART TABLE ================= */}
          <div className="w-full xl:flex-1 bg-white p-4 rounded-xl overflow-x-auto">

            <table className="w-full min-w-[750px]">

              <thead>
                <tr className="text-center border-b border-gray-300 text-gray-500 text-sm font-medium uppercase tracking-wide">

                  <th className="text-left px-2 py-3">
                    Product
                  </th>

                  <th className="px-2 py-3">
                    Price
                  </th>

                  <th className="px-2 py-3">
                    Quantity
                  </th>

                  <th className="px-2 py-3">
                    Subtotal
                  </th>

                  <th className="w-10 px-2 py-3"></th>

                </tr>
              </thead>

              <tbody>

                {validProducts.length > 0 ? (
                  validProducts.map((item) => {
                    const product = item.product;

                    const itemSubtotal =
                      product.Product_Price * item.quantity;

                    return (
                      <tr
                        key={product._id}
                        className="text-center border-b border-gray-200"
                      >

                        {/* PRODUCT */}
                        <td className="px-2 py-5 text-left">

                          <div className="flex items-center gap-3">

                            <img
                              src={`https://iecomifybackend.onrender.com${product.Product_Image}`}
                              alt={product.Product_Name}
                              className="w-20 h-20 object-contain bg-gray-50 rounded-lg"
                            />

                            <span className="text-sm sm:text-base font-medium text-gray-900">
                              {product.Product_Name}
                            </span>

                          </div>

                        </td>

                        {/* PRICE */}
                        <td className="px-2 py-5 text-gray-700">
                          Rs.{" "}
                          {Number(
                            product.Product_Price
                          ).toLocaleString()}
                        </td>

                        {/* QUANTITY */}
                        <td className="px-2 py-5">

                          <div className="mx-auto w-fit p-2 bg-white rounded-full border border-gray-300 flex items-center justify-between gap-3">

                            <button
                              onClick={() =>
                                dispatch(
                                  decreaseQuantity(product._id)
                                )
                              }
                              className="w-6 h-6 flex items-center justify-center cursor-pointer text-gray-600 hover:text-black"
                            >
                              −
                            </button>

                            <span className="w-8 text-center text-gray-900">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() =>
                                dispatch(
                                  increaseQuantity(product._id)
                                )
                              }
                              className="w-6 h-6 flex items-center justify-center cursor-pointer text-gray-600 hover:text-black"
                            >
                              +
                            </button>

                          </div>

                        </td>

                        {/* SUBTOTAL */}
                        <td className="px-2 py-5 font-medium text-gray-900">
                          Rs.{" "}
                          {Number(
                            itemSubtotal
                          ).toLocaleString()}
                        </td>

                        {/* DELETE */}
                        <td className="px-2 py-5">

                          <button
                            onClick={() =>
                              dispatch(
                                deleteProductFromCart(
                                  product._id
                                )
                              )
                            }
                            className="cursor-pointer hover:opacity-70 transition"
                            title="Remove product"
                          >
                            <TrashIcon />
                          </button>

                        </td>

                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-16 text-center"
                    >
                      <h2 className="text-xl font-semibold text-gray-700">
                        Your cart is empty
                      </h2>

                      <p className="mt-2 text-gray-500">
                        Add some products to your cart.
                      </p>

                      <button
                        onClick={() => navigate("/")}
                        className="mt-5 px-6 py-3 bg-gray-100 rounded-full text-sm font-semibold text-gray-700 hover:bg-gray-200 transition"
                      >
                        Return to shop
                      </button>
                    </td>
                  </tr>
                )}

              </tbody>

              {/* ================= TABLE FOOTER ================= */}
              {validProducts.length > 0 && (
                <tfoot>

                  <tr className="border-t border-gray-300">

                    <td
                      colSpan="5"
                      className="px-2 pt-5"
                    >

                      <button
                        onClick={() => navigate("/shop")}
                        className="px-8 py-3.5 bg-gray-100 rounded-full text-gray-700 text-sm font-semibold hover:bg-red-500 transition"
                      >
                        Return to shop
                      </button>

                    </td>

                  </tr>

                </tfoot>
              )}

            </table>

          </div>

          {/* ================= CART TOTAL ================= */}
          <div className="w-full xl:w-[400px] bg-white rounded-xl p-6">

            <h2 className="text-xl font-medium text-gray-900 mb-2">
              Cart Total
            </h2>

            {/* Total Items */}
            <div className="py-3 flex justify-between items-center border-b border-gray-200">

              <span className="text-gray-600">
                Total Items:
              </span>

              <span className="font-semibold text-gray-900">
                {totalItemsInCart}
              </span>

            </div>

            {/* Shipping */}
            <div className="py-3 flex justify-between items-center border-b border-gray-200">

              <span className="text-gray-600">
                Shipping:
              </span>

              <span className="font-medium text-gray-900">
                {shipping === 0
                  ? "Free"
                  : `Rs. ${shipping}`}
              </span>

            </div>

            {/* Subtotal */}
            <div className="py-3 flex justify-between items-center border-b border-gray-200">

              <span className="text-gray-600">
                Subtotal:
              </span>

              <span className="font-medium text-gray-900">
                Rs. {subtotal.toLocaleString()}
              </span>

            </div>

            {/* Total */}
            <div className="py-4 flex justify-between items-center">

              <span className="text-lg font-semibold text-gray-900">
                Total:
              </span>

              <span className="text-lg font-bold text-gray-900">
                Rs. {total.toLocaleString()}
              </span>

            </div>

            {/* Checkout */}
            <button
              onClick={() => navigate("/checkout")}
              disabled={validProducts.length === 0}
              className={`w-full mt-2 px-10 py-4 rounded-full text-base font-semibold transition ${
                validProducts.length > 0
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Proceed to checkout
            </button>

          </div>

        </div>

        {/* ================= COUPON ================= */}
        <div className="mt-6 w-full xl:w-[calc(100%-424px)] bg-white rounded-xl border border-gray-200 p-5">

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">

            <h3 className="text-xl font-medium text-gray-900 sm:w-1/4">
              Coupon Code
            </h3>

            <div className="flex w-full border border-gray-200 rounded-full overflow-hidden">

              <input
                type="text"
                placeholder="Enter code"
                className="flex-1 px-6 py-3.5 outline-none text-gray-700 placeholder:text-gray-400"
              />

              <button
                className="px-8 sm:px-10 py-3.5 bg-gray-800 text-white font-semibold hover:bg-gray-700 transition"
              >
                Apply Coupon
              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Cart;