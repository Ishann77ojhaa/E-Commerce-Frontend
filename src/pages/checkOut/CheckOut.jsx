import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  deleteProductFromCart,
} from "../../store/cartSlice";
import { useForm } from "react-hook-form";
import { createOrder, initiateKhalti } from "../../store/checkOutSlice";
import { useNavigate } from "react-router-dom";

const formFields = [
  { id: "fname", label: "Full_Name", type: "text", placeholder: "Ishan Ojha" },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "ishann@gmail.com",
  },
  {
    id: "Phone",
    label: "Phone_Number",
    type: "tel",
    placeholder: "9746359298",
  },
  {
    id: "Shipping_Address",
    label: "Shipping_Address",
    type: "text",
    placeholder: "123 Main Street",
  },
  { id: "District", label: "District", type: "text", placeholder: "Jhapa" },
  { id: "Area", label: "Area", type: "text", placeholder: "Near Bus Park" },
  {
    id: "postal-CODe",
    label: "Postal CODe",
    type: "text",
    placeholder: "10001",
  },
];

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

const MinusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-2.5 fill-current"
    viewBox="0 0 124 124"
    aria-hidden="true"
  >
    <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" />
  </svg>
);

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-2.5 fill-current"
    viewBox="0 0 42 42"
    aria-hidden="true"
  >
    <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" />
  </svg>
);

export default function CheckOut() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [paymentMethod, setPaymentMethod] = useState("COD")

const onSubmit = async (data) => {
  console.log(data)
    const orderData = {
        shipping_address: data.Shipping_Address,
        phone_number: data.Phone,
        payment_details: {
            method: paymentMethod
        },
        items: cartItems.map(item => ({
            product: item.product._id,
            quantity: item.quantity
        })),
        total_amount: total
    }

    console.log(orderData)
    const order = await dispatch(createOrder(orderData));
    if(paymentMethod === "Khalti"){
        dispatch(
            initiateKhalti(
                order._id,
                order.Total_Amount
            )
        );
    }else{
        navigate("/order-success");
    }
}

  const dispatch = useDispatch();
  const { items: cartItems } = useSelector((state) => state.cart);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.Product_Price * item.quantity,
    0,
  );
  const SHIPPING = subtotal > 3000 ? 0 : 150;
  const total = subtotal + SHIPPING;



  return (
    <main>
      <h1 className="sr-only">Checkout</h1>
      <div className="bg-gray-50 px-4 py-6 md:px-8 dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-y-12 gap-8 lg:grid-cols-2">
            {/* Form section */}
            <section className="w-full h-max">

              
              <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                  <legend className="text-xl text-slate-900 font-semibold mb-6 dark:text-slate-50">
                    Delivery Details
                  </legend>

                  <div className="grid lg:grid-cols-2 gap-6">
                    {formFields.map(({ id, label, type, placeholder }) => (
                      <div key={id}>
                        <label
                          htmlFor={id}
                          className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50"
                        >
                          {label}
                        </label>

                        <input
                          type={type}
                          id={id}
                          name={id}
                          placeholder={placeholder}
                          {...register(id, {
                            required: `${label} is required`,
                          })}
                          className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-800 dark:outline-neutral-700"
                        />
                        {errors[id] && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors[id].message}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </fieldset>

                {/* Payment Methods */}
                <fieldset className="mt-12">
                  <legend className="text-xl text-slate-900 font-semibold mb-6 dark:text-slate-50">
                    Payment Method
                  </legend>

                  <div className="grid gap-4">
                    {/* Cash on Delivery */}
                    <label
                      htmlFor="COD"
                      className={`flex items-center justify-between border rounded-xl p-4 cursor-pointer transition ${
                        paymentMethod === "COD"
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-300 hover:border-blue-400"
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="COD"
                          checked={paymentMethod === "COD"}
                          value="COD"
                          {...register("paymentMethod", {
                            required: "Please select a payment method",
                          })}
                          // checked={paymentMethod === "COD"}
                          onChange={()=>setPaymentMethod("COD")}
                          className="w-4.5 h-4.5 accent-blue-600"
                        />

                        <div className="ml-4">
                          <p className="font-semibold text-gray-800">
                            Cash on Delivery
                          </p>
                          <p className="text-sm text-gray-500">
                            Pay when your order arrives.
                          </p>
                        </div>
                      </div>

                      <span className="text-3xl">💵</span>
                    </label>

                    {/* Khalti */}
                    <label
                      htmlFor="khalti"
                      className={`flex items-center justify-between border rounded-xl p-4 cursor-pointer transition ${
                        paymentMethod === "khalti"
                          ? "border-purple-600 bg-purple-50"
                          : "border-gray-300 hover:border-purple-400"
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="Khalti"
                          value="Khalti"
                          name="payment"
                          {...register("paymentMethod", {
                            required: "Please select a payment method",
                          })}
                          checked={paymentMethod === "Khalti"}
                          onChange={()=>setPaymentMethod("Khalti")}
                          className="w-4.5 h-4.5 accent-purple-600"
                        />

                        <div className="ml-4">
                          <p className="font-semibold text-gray-800">Khalti</p>
                          <p className="text-sm text-gray-500">
                            Secure online payment using Khalti Wallet.
                          </p>
                        </div>
                      </div>

                      <img
                        src="https://web.khalti.com/samagri/img/logo1.png"
                        alt="Khalti"
                        className="h-8 object-contain"
                      />
                    </label>
                    {errors.paymentMethod && (
                      <p className="text-red-500 text-sm">
                        {errors.paymentMethod.message}
                      </p>
                    )}
                  </div>
                </fieldset>

                <div className="mt-8">
                  <button
                    type="submit"
                    className="w-full px-3.5 py-2 text-white text-sm font-semibold rounded-md cursor-pointer bg-blue-600 hover:bg-blue-700 border border-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    Pay Rs. {total.toFixed(2)}
                  </button>
                </div>
              </form>
              

            </section>

            {/* Order Summary */}
            <section className="max-lg:-order-1">
              <h2 className="text-xl text-slate-900 font-semibold mb-6 dark:text-slate-50">
                Order Summary
              </h2>
              <div className="relative bg-white border border-slate-300 rounded-md dark:bg-neutral-800 dark:border-neutral-700">
                <div className="p-6 md:overflow-auto">
                  <div className="space-y-6">
                    {cartItems.map((item, index) => (
                      <div key={item.id}>
                        <div className="flex flex-col gap-4 sm:flex-row">
                          <div className="w-24 h-24 shrink-0 bg-gray-50 p-2 rounded-md dark:bg-neutral-700">
                            <img
                              src={item.product.Product_Image}
                              className="w-full h-full object-contain"
                              alt={item.product.Product_Name}
                            />
                          </div>
                          <div className="w-full flex justify-between gap-4">
                            <div>
                              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                                {item.product.Product_Name}
                              </h3>
                              <p className="text-sm text-slate-900 font-semibold mt-4 dark:text-slate-50">
                                Rs.{" "}
                                {(
                                  item.product.Product_Price * item.quantity
                                ).toLocaleString()}
                              </p>
                            </div>
                            <div className="flex flex-col justify-between items-end gap-4">
                              {/* Remove Button */}
                              <button
                                type="button"
                                aria-label={`Remove ${item.name} from cart`}
                                onClick={() =>
                                  dispatch(
                                    deleteProductFromCart(item.product._id),
                                  )
                                }
                                className="text-red-600 w-max shrink-0 cursor-pointer dark:text-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                              >
                                <TrashIcon />
                              </button>

                              {/* Quantity Selector */}
                              <div className="flex items-center w-max mt-auto px-2.5 py-1.5 border border-slate-300 text-slate-900 font-medium text-xs rounded-md dark:border-neutral-700 dark:text-slate-50 dark:bg-neutral-800">
                                <button
                                  type="button"
                                  aria-label="Decrease quantity"
                                  onClick={() =>
                                    dispatch(decreaseQuantity(item.product._id))
                                  }
                                  className="cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                                >
                                  <MinusIcon />
                                </button>
                                <span className="mx-3">{item.quantity}</span>
                                <button
                                  type="button"
                                  aria-label="Increase quantity"
                                  onClick={() =>
                                    dispatch(increaseQuantity(item.product._id))
                                  }
                                  className="cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                                >
                                  <PlusIcon />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        {index < cartItems.length - 1 && (
                          <hr className="border-slate-300 dark:border-neutral-700 mt-6" />
                        )}
                      </div>
                    ))}
                  </div>

                  <hr className="border-slate-300 my-6 dark:border-neutral-700" />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
