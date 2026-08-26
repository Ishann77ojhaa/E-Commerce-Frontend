import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Register from "./pages/auth/register/Register";
import Login from "./pages/auth/login/Login";
import Layout from "./layout";
import Cart from "./pages/cart/cart";
import ProductDetails from "./pages/productDetails/productDetails";
import CheckOut from "./pages/checkOut/CheckOut";
import KhaltiSuccess from "./pages/success/khaltiSuccess";
import CODSuccess from "./pages/success/codSuccess";
import Orders from "./pages/home/components/myOrders";
import OrderDetails from "./pages/orderDetails/OrderDetails";

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
        element: <Orders/>
      },{
        path: "/orders/:id",
        element: <OrderDetails/>
      }
    ],
  },
]);

export default router;