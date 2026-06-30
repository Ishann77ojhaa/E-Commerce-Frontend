import { Link, NavLink } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

const Navbar = () => {
  const items = useSelector((state)=>state.cart);
  console.log(items)

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold text-blue-600 tracking-wide hover:text-blue-700 transition-colors"
        >
          IshShop
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-8 text-gray-700 font-medium">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative pb-1 transition-all duration-300 ${
                isActive ? "text-blue-600" : "hover:text-blue-600"
              }
              after:absolute after:left-0 after:-bottom-1 after:h-0.5
              after:w-0 after:bg-blue-600 after:transition-all after:duration-300
              hover:after:w-full`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `relative pb-1 transition-all duration-300 ${
                isActive ? "text-blue-600" : "hover:text-blue-600"
              }
              after:absolute after:left-0 after:-bottom-1 after:h-0.5
              after:w-0 after:bg-blue-600 after:transition-all after:duration-300
              hover:after:w-full`
            }
          >
            About
          </NavLink>

          <NavLink
            to="/services"
            className={({ isActive }) =>
              `relative pb-1 transition-all duration-300 ${
                isActive ? "text-blue-600" : "hover:text-blue-600"
              }
              after:absolute after:left-0 after:-bottom-1 after:h-0.5
              after:w-0 after:bg-blue-600 after:transition-all after:duration-300
              hover:after:w-full`
            }
          >
            Services
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `flex items-center gap-2 relative pb-1 transition-all duration-300 ${
                isActive ? "text-blue-600" : "hover:text-blue-600"
              }
              after:absolute after:left-0 after:-bottom-1 after:h-0.5
              after:w-0 after:bg-blue-600 after:transition-all after:duration-300
              hover:after:w-full`
            }
          >
            <ShoppingCartIcon className="h-5 w-5" />
            Cart <sup> {items.length} </sup>
          </NavLink>

        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">

          <Link
            to="/login"
            className="px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-gray-100 hover:text-blue-600"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
          >
            Sign Up
          </Link>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;