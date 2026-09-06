import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../../../../store/productSlice";
import { addToCart } from "../../../../store/cartSlice";
import { useNavigate, useLocation } from "react-router-dom";

const StarRating = ({ rating = 0 }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={`w-4 h-4 ${
            star <= rating ? "fill-yellow-400" : "fill-gray-300"
          }`}
        >
          <path d="m23.363 8.584-7.378-1.127L12.678.413c-.247-.526-1.11-.526-1.357 0L8.015 7.457.637 8.584a.75.75 0 0 0-.423 1.265l5.36 5.494-1.267 7.767a.75.75 0 0 0 1.103.777L12 20.245l6.59 3.643a.75.75 0 0 0 1.103-.777l-1.267-7.767 5.36-5.494a.75.75 0 0 0-.423-1.266z" />
        </svg>
      ))}
    </div>
  );
};

const Sproduct = ({ id: productId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [pincode, setPincode] = useState("");

  const { selectedProduct, status } = useSelector(
    (state) => state.product
  );

  const product = selectedProduct?.product?.[0];
  const reviews = selectedProduct?.productReviews || [];

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductDetails(productId));
    }
  }, [dispatch, productId]);

  const handleCart = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", {
        state: {
          from: location.pathname,
        },
      });
      return;
    }

    dispatch(addToCart(productId));
  };

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

  if (!product) {
    return (
      <div className="text-center py-20 text-lg">
        Product not found.
      </div>
    );
  }

  const rating = product.rating || 0;

  return (
    <section className="px-4 md:px-8 mt-6 bg-white">

      <div className="max-w-2xl mx-auto lg:max-w-7xl lg:mx-auto">

        {/* ================= HEADER ================= */}

        <div>
          <h1 className="text-xl font-bold text-slate-900 md:text-2xl">
            {product.Product_Name}
          </h1>

          <p className="text-slate-600 mt-2 text-sm">
            {product.Product_Brand || "Well-Versed Commerce"}
          </p>
        </div>

        {/* ================= MAIN CONTENT ================= */}

        <div className="grid items-start gap-8 mt-6 lg:grid-cols-5">

          {/* ================= PRODUCT IMAGE ================= */}

          <div className="lg:col-span-3">

            <div className="bg-gray-100 p-6 flex items-center justify-center rounded-md min-h-[450px]">

              <img
                src={`https://iecomifybackend.onrender.com/${product.Product_Image}`}
                alt={product.Product_Name}
                className="
                  w-full
                  max-h-[500px]
                  object-contain
                  object-center
                "
              />

            </div>

          </div>

          {/* ================= PRODUCT DETAILS ================= */}

          <div className="w-full lg:col-span-2">

            {/* PRICE */}

            <div className="flex items-center flex-wrap gap-4">

              <p className="text-slate-900 font-bold text-2xl md:text-3xl">
                Rs. {product.Product_Price}
              </p>

            </div>

            {/* RATING */}

            <div className="flex items-center gap-3 mt-4">

              <div className="flex items-center gap-2">

                <p className="text-base font-semibold text-slate-700">
                  {rating.toFixed(1)}
                </p>

                <StarRating rating={rating} />

              </div>

              <span className="text-slate-400">|</span>

              <p className="text-sm text-slate-600">
                {reviews.length} Reviews
              </p>

            </div>

            {/* DESCRIPTION */}

            <div className="mt-6">

              <h3 className="text-lg font-semibold text-slate-900">
                Description
              </h3>

              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                {product.Product_Description}
              </p>

            </div>

            {/* STATUS */}

            <div className="mt-6">

              <span className="font-semibold text-gray-800">
                Status:
              </span>

              <span
                className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${
                  product.Product_Status === "Available"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {product.Product_Status}
              </span>

            </div>

            {/* STOCK */}

            <div className="mt-5">

              <span className="font-semibold text-gray-800">
                Stock:
              </span>

              <span
                className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${
                  product.Product_StockQTY > 0
                    ? "bg-blue-100 text-blue-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {product.Product_StockQTY > 0
                  ? `${product.Product_StockQTY} Available`
                  : "Out of Stock"}
              </span>

            </div>

            {/* ACTION BUTTONS */}

            <div className="flex flex-col gap-4 mt-8 sm:flex-row">


              <button
                type="button"
                onClick={handleCart}
                disabled={
                  product.Product_Status !== "Available" ||
                  product.Product_StockQTY <= 0
                }
                className="
                  w-full
                  sm:w-[45%]
                  px-4
                  py-2.5
                  text-white
                  text-sm
                  font-semibold
                  rounded-md
                  bg-blue-600
                  hover:bg-blue-700
                  disabled:bg-gray-400
                  disabled:cursor-not-allowed
                  transition-colors
                "
              >
                Add to cart
              </button>

            </div>

            {/* DELIVERY LOCATION */}

            <div className="mt-8">

              <h3 className="text-lg font-semibold text-slate-900">
                Select Delivery Location
              </h3>

              <p className="text-slate-600 text-sm mt-2">
                Enter the pincode of your area to check product availability.
              </p>

              <div className="max-w-sm mt-6 flex flex-col gap-4 sm:flex-row">

                <input
                  type="text"
                  placeholder="Enter pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="
                    px-3
                    py-2.5
                    text-sm
                    text-slate-900
                    rounded-md
                    bg-white
                    w-full
                    outline-1
                    outline-slate-300
                    focus:outline-2
                    focus:outline-blue-600
                  "
                />

                <button
                  type="button"
                  className="
                    py-2
                    px-3.5
                    text-sm
                    rounded-md
                    font-semibold
                    text-white
                    bg-blue-600
                    hover:bg-blue-700
                    transition-all
                  "
                >
                  Apply
                </button>

              </div>

            </div>

          </div>
        </div>

        {/* ================= PRODUCT DESCRIPTION ================= */}

        <div className="max-w-3xl mt-12 md:mt-16">

          <h2 className="text-lg font-semibold text-slate-900">
            Product Description
          </h2>

          <p className="text-sm text-slate-600 mt-4 leading-relaxed">
            {product.Product_Description}
          </p>

          {/* ================= REVIEWS ================= */}

          <div className="mt-10" id="customer-reviews">

            <h2 className="text-lg font-semibold text-slate-900">
              Customer Reviews
            </h2>

            {reviews.length === 0 ? (

              <p className="text-sm text-gray-500 mt-5">
                No reviews yet.
              </p>

            ) : (

              <div className="mt-6 space-y-8">

                {reviews.map((review) => (

                  <article
                    key={review._id}
                    className="flex items-start gap-4"
                  >

                    {/* Avatar */}

                    <div
                      className="
                        w-12
                        h-12
                        rounded-full
                        bg-gray-200
                        flex
                        items-center
                        justify-center
                        shrink-0
                      "
                    >
                      <span className="font-semibold text-gray-600">
                        {review.user?.user_Name?.charAt(0) || "U"}
                      </span>
                    </div>

                    {/* Review */}

                    <div>

                      <p className="text-slate-900 text-sm font-semibold">
                        {review.user?.user_Name || "Anonymous"}
                      </p>

                      <div className="flex items-center gap-2 mt-1">

                        <StarRating
                          rating={review.rating || 0}
                        />

                        <span className="text-xs text-gray-500">
                          {review.createdAt
                            ? new Date(
                                review.createdAt
                              ).toLocaleDateString()
                            : ""}
                        </span>

                      </div>

                      <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                        {review.comment || review.review}
                      </p>

                    </div>

                  </article>

                ))}

              </div>

            )}

          </div>

        </div>

      </div>

    </section>
  );
};

export default Sproduct;