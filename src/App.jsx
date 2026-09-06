import { RouterProvider } from "react-router-dom";
import router from "./routes";
import {io} from "socket.io-client"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "./store/productSlice";

export const socket = io("https://iecomifybackend.onrender.com",{
  auth:{
    token : localStorage.getItem("token")
  }
});

function App() {
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(fetchProducts());
  },[dispatch]);
  
  return <RouterProvider router={router} />;
}

export default App;