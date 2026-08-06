import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Register from "./pages/auth/register/Register";
import Login from "./pages/auth/login/Login";
import Layout from "./layout";
import Cart from "./pages/cart/cart";
import ProductDetails from "./pages/productDetails/productDetails";
import CheckOut from "./pages/checkOut/CheckOut";

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
    ],
  },
]);

export default router;