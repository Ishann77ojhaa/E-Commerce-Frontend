import { CheckCircleIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";

const CODSuccess = () => {
  const location = useLocation();

  const order = location.state?.order;

  return (
    <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">

        {/* Success Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 sm:p-10 text-center">

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-50">
              <CheckCircleIcon className="w-12 h-12 text-green-600" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Order Placed Successfully!
          </h1>

          <p className="mt-3 text-slate-600">
            Thank you for shopping with IshShop. Your order has been
            successfully placed.
          </p>

          {/* Order Information */}
          {order && (
            <div className="mt-8 border border-slate-200 rounded-xl overflow-hidden text-left">

              <div className="px-5 py-4 bg-slate-50 border-b border-slate-200">
                <h2 className="font-semibold text-slate-900">
                  Order Details
                </h2>
              </div>

              <div className="p-5 space-y-4">

                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">
                    Order ID
                  </span>

                  <span className="font-medium text-slate-900 break-all">
                    #{order._id}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">
                    Payment Method
                  </span>

                  <span className="font-medium text-slate-900">
                    Cash on Delivery
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">
                    Order Status
                  </span>

                  <span className="font-medium text-yellow-600">
                    Pending
                  </span>
                </div>

                <div className="flex justify-between gap-4 pt-4 border-t border-slate-200">
                  <span className="font-medium text-slate-700">
                    Total Amount
                  </span>

                  <span className="text-lg font-bold text-slate-900">
                    Rs. {order.Total_Amount}
                  </span>
                </div>

              </div>
            </div>
          )}

          {/* COD Information */}
          <div className="mt-6 rounded-xl bg-blue-50 border border-blue-100 p-5 text-left">
            <h3 className="font-semibold text-blue-900">
              What happens next?
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-blue-800">
              We'll prepare your order and deliver it to your provided
              address. You can pay the order amount when it arrives.
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">

            <Link
              to="/orders"
              className="inline-flex items-center justify-center gap-2
                         px-6 py-3 rounded-lg
                         bg-blue-600 text-white font-semibold
                         hover:bg-blue-700 transition-colors"
            >
              <ShoppingBagIcon className="w-5 h-5" />
              My Orders
            </Link>

            <Link
              to="/"
              className="inline-flex items-center justify-center
                         px-6 py-3 rounded-lg
                         border border-slate-300
                         text-slate-700 font-semibold
                         hover:bg-slate-50 transition-colors"
            >
              Continue Shopping
            </Link>

          </div>

        </div>
      </div>
    </div>
  );
};

export default CODSuccess;