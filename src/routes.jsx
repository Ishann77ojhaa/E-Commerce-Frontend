import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Register from "./pages/auth/register/Register";
import Login from "./pages/auth/login/Login";
import Layout from "./layout";
import Cart from "./pages/cart/cart";
import CheckOut from "./pages/checkOut/CheckOut";
import KhaltiSuccess from "./pages/success/khaltiSuccess";
import CODSuccess from "./pages/success/codSuccess";
import MyOrders from "./pages/home/components/MyOrders";
import OrderDetails from "./pages/orderDetails/OrderDetails";
import ForgotPassword from "./pages/auth/forgotPass/ForgotPassword";
import VerifyOTPPage from "./pages/auth/forgotPass/VerifyOTP";
import ResetPass from "./pages/auth/forgotPass/ResetPass";
import NewArrivals from "./pages/newArrivals/NewArrivals";
import ProductDetails from "./pages/productDetails/ProductDetails";
import MyProfile from "./pages/profile/MyProfile";
import Man from "./shopping/Man";
import Women from "./shopping/Women";
import Footwear from "./shopping/Footwear";
import Accessories from "./shopping/Accessories";
import Sale from "./shopping/Sale";
import Shop from "./shopping/Shop";


const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/productdetails/:id",
        element: <ProductDetails/>,
      },
      {
        path: "/checkout",
        element: <CheckOut/>,
      },
      {
        path: "/order-success/:orderId",
        element: <KhaltiSuccess/>
      },
      {
        path: "/order-success",
        element: <CODSuccess/>
      },{
        path: "/orders",
        element: <MyOrders/>
      },{
        path: "/orders/:id",
        element: <OrderDetails/>
      },{
        path: "/forgotpassword",
        element: <ForgotPassword/>
      },{
        path: "/verify-otp",
        element: <VerifyOTPPage/>
      },{
        path: "/reset-password",
        element: <ResetPass/>
      },{
        path: "/new-arrivals",
        element: <NewArrivals/>
      },{
        path: "/profile",
        element: <MyProfile/>
      },{
        path: "/shop/men",
        element: <Man/>
      },{
        path: "/shop/women",
        element: <Women/>
      },{
        path: "/shop/footwear",
        element: <Footwear/>
      },{
        path: "/shop/accessories",
        element: <Accessories/>
      },{
        path: "/sale",
        element: <Sale/>
      },{
        path: "/shop",
        element: <Shop/>
      }
    ],
  },
]);

export default router;