import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  ArrowLeftIcon,
  CheckCircleIcon,
  ClockIcon,
  TruckIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

import { getOrderById } from "../../../src/store/orderSlice";
import { STATUSES } from "../../globals/components/misc/statuses";
import Loader from "../../globals/components/loader/loader";

export default function OrderDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedOrder, status: loadingStatus } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    if (id) {
      dispatch(getOrderById(id));
    }
  }, [id, dispatch]);

  if (loadingStatus === STATUSES.LOADING) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!selectedOrder) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Order Not Found
          </h1>

          <p className="mt-2 text-slate-500">
            We couldn't find this order.
          </p>

          <Link
            to="/orders"
            className="inline-block mt-6 px-5 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
          >
            Back to Orders
          </Link>
        </div>
      </main>
    );
  }

  const order = selectedOrder;

  const isPaid =
    order.Payment_Details?.status === "Paid";

  const paymentMethod =
    order.Payment_Details?.method || "Cash on Delivery";

  const status = order.Order_Status;

  const subtotal = order.Items?.reduce(
    (total, item) =>
      total + (item.price || 0) * (item.quantity || 0),
    0
  );

  return (
    <main className="px-4 md:px-8 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Back */}
        <Link
          to="/orders"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to My Orders
        </Link>

        {/* Header */}
        <div className="mt-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">

            <div>
              <p className="text-sm text-slate-500">
                Order Details
              </p>

              <h1 className="mt-1 text-3xl font-bold text-slate-900 break-all">
                #{order._id}
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Placed on{" "}
                {new Date(order.createdAt).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </p>
            </div>

            {/* Status */}
            <span
              className={`inline-flex w-fit px-4 py-2 rounded-full text-sm font-semibold ${
                status === "Cancelled"
                  ? "bg-red-100 text-red-700"
                  : status === "Completed"
                  ? "bg-green-100 text-green-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {status}
            </span>

          </div>
        </div>

        {/* Main Grid */}
        <div className="mt-8 grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="xl:col-span-2 space-y-6">

            {/* Items */}
            <section className="bg-white border border-slate-200 rounded-xl overflow-hidden">

              <div className="px-6 py-5 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900">
                  Order Items
                </h2>
              </div>

              <div className="divide-y divide-slate-200">

                {order.Items?.map((item, index) => {
                  const product = item.product;

                  return (
                    <div
                      key={item._id || index}
                      className="p-6 flex flex-col sm:flex-row gap-5"
                    >

                      {/* Image */}
                      <div className="w-24 h-24 shrink-0 bg-slate-100 rounded-lg p-2">
                        <img
                          src={product?.Product_Image}
                          alt={
                            product?.Product_Name ||
                            "Product"
                          }
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Product */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900">
                          {product?.Product_Name ||
                            "Product"}
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                          Quantity:{" "}
                          <span className="font-medium text-slate-800">
                            {item.quantity}
                          </span>
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          Price:{" "}
                          <span className="font-medium text-slate-800">
                            Rs. {product?.Product_Price || 0}
                          </span>
                        </p>
                      </div>

                      {/* Item total */}
                      <div className="sm:text-right">
                        <p className="text-xs text-slate-500">
                          Item Total
                        </p>

                        <p className="mt-1 font-semibold text-slate-900">
                          Rs. {(product?.Product_Price || 0) *item.quantity}
                        </p>
                      </div>

                    </div>
                  );
                })}

              </div>
            </section>

            {/* Shipping */}
            <section className="bg-white border border-slate-200 rounded-xl p-6">

              <h2 className="text-lg font-semibold text-slate-900">
                Shipping Information
              </h2>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Shipping Address
                  </p>

                  <p className="mt-2 text-sm text-slate-700 leading-6">
                    {order.Shipping_Address}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Phone Number
                  </p>

                  <p className="mt-2 text-sm text-slate-700">
                    {order.Phone_Number}
                  </p>
                </div>

              </div>
            </section>

          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            {/* Summary */}
            <section className="bg-white border border-slate-200 rounded-xl p-6">

              <h2 className="text-lg font-semibold text-slate-900">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4">

                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">
                    Subtotal
                  </span>

                  <span className="font-medium text-slate-900">
                    Rs. {subtotal}
                  </span>
                </div>

                <div className="border-t border-slate-200 pt-4 flex justify-between">
                  <span className="font-semibold text-slate-900">
                    Total
                  </span>

                  <span className="text-xl font-bold text-slate-900">
                    Rs. {order.Total_Amount}
                  </span>
                </div>

              </div>
            </section>

            {/* Payment */}
            <section className="bg-white border border-slate-200 rounded-xl p-6">

              <h2 className="text-lg font-semibold text-slate-900">
                Payment
              </h2>

              <div className="mt-5 space-y-4">

                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">
                    Method
                  </span>

                  <span className="text-sm font-semibold text-slate-900">
                    {paymentMethod}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">
                    Status
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      isPaid
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {isPaid ? "Paid" : "Not Paid"}
                  </span>
                </div>

              </div>
            </section>

            {/* Status Timeline */}
            <section className="bg-white border border-slate-200 rounded-xl p-6">

              <h2 className="text-lg font-semibold text-slate-900">
                Order Status
              </h2>

              <div className="mt-6 space-y-5">

                <StatusStep
                  active
                  icon={CheckCircleIcon}
                  title="Order Placed"
                  description="Your order has been placed successfully."
                />

                <StatusStep
                  active={isPaid}
                  icon={isPaid ? CheckCircleIcon : ClockIcon}
                  title="Payment"
                  description={
                    isPaid
                      ? "Payment has been confirmed."
                      : "Payment is pending."
                  }
                />

                <StatusStep
                  active={
                    status === "On the Way" ||
                    status === "Completed"
                  }
                  icon={TruckIcon}
                  title="On the Way"
                  description="Your order is being delivered."
                />

                <StatusStep
                  active={status === "Completed"}
                  icon={CheckCircleIcon}
                  title="Delivered"
                  description="Your order has been delivered."
                />

                {status === "Cancelled" && (
                  <StatusStep
                    active
                    icon={XCircleIcon}
                    title="Cancelled"
                    description="This order has been cancelled."
                  />
                )}

              </div>

            </section>

          </div>

        </div>
      </div>
    </main>
  );
}


/* Status Step */

function StatusStep({
  active,
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="flex items-start gap-3">

      <div
        className={`mt-0.5 ${
          active
            ? "text-blue-600"
            : "text-slate-300"
        }`}
      >
        <Icon className="w-5 h-5" />
      </div>

      <div>
        <p
          className={`text-sm font-semibold ${
            active
              ? "text-slate-900"
              : "text-slate-400"
          }`}
        >
          {title}
        </p>

        <p className="mt-1 text-xs text-slate-500">
          {description}
        </p>
      </div>

    </div>
  );
}