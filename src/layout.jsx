import { Outlet } from "react-router-dom";
import Navbar from "./globals/components/navbar/Navbar";
import Footer from "./globals/components/footer/footer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCart } from "./store/cartSlice";

export default function Layout() {
  const dispatch = useDispatch();

  useEffect(()=>{
    const token = localStorage.getItem("token");

    if(token){
      dispatch(fetchCart());
    }}, [dispatch]);
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