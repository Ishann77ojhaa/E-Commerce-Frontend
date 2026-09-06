import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const CartDropdown = () => {
  const [open, setOpen] = useState(false);

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.quantity * item.product.Product_Price,
    0
  );

  return (
    <div className="relative">

      {/* Cart Button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
          relative
          text-gray-700
          hover:text-indigo-600
          transition-colors
        "
        aria-label="Shopping cart"
      >
        <ShoppingBagIcon className="w-5 h-5" />

        {/* Cart Count */}
        {totalItems > 0 && (
          <span
            className="
              absolute
              -top-2
              -right-2
              min-w-[18px]
              h-[18px]
              px-1
              flex
              items-center
              justify-center
              rounded-full
              bg-indigo-600
              text-white
              text-[10px]
              font-bold
            "
          >
            {totalItems}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute
            right-0
            top-full
            mt-4
            w-80
            bg-white
            border
            border-gray-100
            rounded-lg
            shadow-lg
            overflow-hidden
            z-50
          "
        >

          {/* Header */}
          <div
            className="
              flex
              items-center
              justify-between
              px-4
              py-4
              border-b
              border-gray-100
            "
          >
            <h3 className="font-semibold text-gray-900">
              Shopping Cart
            </h3>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-gray-700"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Empty Cart */}
          {cartItems.length === 0 ? (
            <div className="px-4 py-10 text-center">

              <ShoppingBagIcon
                className="
                  w-10
                  h-10
                  mx-auto
                  text-gray-300
                  mb-3
                "
              />

              <p className="text-sm text-gray-500">
                Your cart is empty.
              </p>

              <Link
                to="/shop"
                onClick={() => setOpen(false)}
                className="
                  inline-block
                  mt-4
                  text-sm
                  font-medium
                  text-indigo-600
                  hover:text-indigo-700
                "
              >
                Start Shopping
              </Link>

            </div>
          ) : (

            <>
              {/* Cart Items */}
              <div className="max-h-80 overflow-y-auto">

                {cartItems.map((item) => (
                  <div
                    key={item.product._id}
                    className="
                      flex
                      gap-3
                      px-4
                      py-4
                      border-b
                      border-gray-100
                    "
                  >

                    {/* Product Image */}
                    <img
                      src={`https://iecomifybackend.onrender.com${item.product.Product_Image}`}
                      alt={item.product.Product_Name}
                      className="
                        w-16
                        h-16
                        rounded-md
                        object-cover
                      "
                    />

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">

                      <h4
                        className="
                          text-sm
                          font-medium
                          text-gray-900
                          truncate
                        "
                      >
                        {item.product.Product_Name}
                      </h4>

                      <p className="text-xs text-gray-500 mt-1">
                        Qty: {item.quantity}
                      </p>

                      <p className="text-sm font-medium text-gray-900 mt-1">
                        Rs.{" "}
                        {(
                          item.product.Product_Price *
                          item.quantity
                        ).toLocaleString()}
                      </p>

                    </div>

                  </div>
                ))}

              </div>

              {/* Footer */}
              <div className="px-4 py-4">

                <div className="flex justify-between mb-4">
                  <span className="text-sm text-gray-600">
                    Subtotal
                  </span>

                  <span className="font-semibold text-gray-900">
                    Rs. {totalPrice.toLocaleString()}
                  </span>
                </div>

                <Link
                  to="/cart"
                  onClick={() => setOpen(false)}
                  className="
                    block
                    w-full
                    text-center
                    py-2.5
                    bg-indigo-600
                    text-white
                    text-sm
                    font-medium
                    rounded-lg
                    hover:bg-indigo-700
                    transition-colors
                  "
                >
                  View Cart
                </Link>

              </div>
            </>
          )}

        </div>
      )}

    </div>
  );
};

export default CartDropdown;
