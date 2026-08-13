import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../../../store/orderSlice";
import { STATUSES } from "../../../globals/components/misc/statuses";
import Loader from "../../../globals/components/loader/loader";

export default function MyOrders() {
  const dispatch = useDispatch();

  const { orders, status } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  // Loading
  if (status === STATUSES.LOADING) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  // Empty orders
  if (!orders || orders.length === 0) {
    return (
      <main className="min-h-[60vh] px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold text-slate-900">
              No Orders Yet
            </h1>

            <p className="mt-2 text-slate-500">
              You haven't placed any orders yet.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="px-4 md:px-8 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-5">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              My Orders
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              View and track your orders
            </p>
          </div>

          <p className="text-sm text-slate-500">
            {orders.length} {orders.length === 1 ? "Order" : "Orders"}
          </p>
        </div>

        {/* Orders */}
        <div className="mt-8 space-y-6">

          {orders.map((order) => {

            const isPaid =
              order.Payment_Details?.status === "Paid";

            const paymentMethod =
              order.Payment_Details?.method || "Cash on Delivery";

            return (
              <div
                key={order._id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm"
              >

                {/* Order Header */}
                <div className="px-5 py-4 bg-slate-50 border-b border-slate-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-500">
                        Order ID
                      </p>

                      <p className="mt-1 font-semibold text-slate-900 break-all">
                        #{order._id}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-500">
                        Order Date
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-900">
                        {new Date(order.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>

                    {/* Order Status */}
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-500">
                        Status
                      </p>

                      <span
                        className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${
                          order.Order_Status === "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : order.Order_Status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {order.Order_Status}
                      </span>
                    </div>

                  </div>
                </div>

                {/* Products */}
                <div className="divide-y divide-slate-200">

                  {order.Items?.map((item, index) => {

                    const product = item.product;

                    return (
                      <div
                        key={item._id || index}
                        className="p-5 flex flex-col sm:flex-row gap-5"
                      >

                        {/* Product Image */}
                        <div className="w-24 h-24 shrink-0 bg-slate-100 rounded-lg p-2">
                          <img
                            src={product?.Product_Image}
                            alt={product?.Product_Name || "Product"}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">

                          <h2 className="font-semibold text-slate-900">
                            {product?.Product_Name || "Product"}
                          </h2>

                          <p className="mt-2 text-sm text-slate-500">
                            Quantity:{" "}
                            <span className="font-medium text-slate-800">
                              {item.quantity}
                            </span>
                          </p>

                          {item.price && (
                            <p className="mt-1 text-sm text-slate-500">
                              Price:{" "}
                              <span className="font-medium text-slate-800">
                                Rs. {item.price}
                              </span>
                            </p>
                          )}

                        </div>

                      </div>
                    );
                  })}

                </div>

                {/* Order Bottom */}
                <div className="px-5 py-5 border-t border-slate-200 bg-white">

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                    {/* Payment Info */}
                    <div className="flex flex-wrap items-center gap-3">

                      {/* Payment Status */}
                      <div
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                          isPaid
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {isPaid ? "Paid" : "Not Paid"}
                      </div>

                      {/* Payment Method */}
                      <div className="px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                        {paymentMethod === "Khalti"
                          ? "Khalti"
                          : "Cash on Delivery"}
                      </div>

                    </div>

                    {/* Total */}
                    <div className="text-left md:text-right">
                      <p className="text-sm text-slate-500">
                        Total Amount
                      </p>

                      <p className="mt-1 text-xl font-bold text-slate-900">
                        Rs. {order.Total_Amount}
                      </p>
                    </div>

                  </div>

                </div>

              </div>
            );
          })}

        </div>
      </div>
    </main>
  );
}