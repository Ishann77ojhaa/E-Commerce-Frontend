import { Outlet } from "react-router-dom";
import Navbar from "./globals/components/navbar/Navbar";
import Footer from "./globals/components/footer/footer";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}