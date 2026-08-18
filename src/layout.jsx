import { Outlet } from "react-router-dom";
import Navbar from "./globals/components/navbar/Navbar";
import Footer from "./globals/components/footer/footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearCart, fetchCart } from "./store/cartSlice";
import { fetchProfile, getMe } from "./store/authSlice";

export default function Layout() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(()=>{ 
    if(token){
      dispatch(getMe())
      dispatch(fetchProfile());
      dispatch(fetchCart());  
    }else{
      dispatch(clearCart());
    }}, [token, dispatch]);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}