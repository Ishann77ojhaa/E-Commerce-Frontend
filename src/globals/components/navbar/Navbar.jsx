import {
  ShoppingCartIcon,
  UserIcon,
  ShoppingBagIcon,
  StarIcon,
  ClockIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state=>state.auth.data))
  console.log("Navbar user=", user)
  const {items} = useSelector((state)=>state.cart);

  const handleLogout = () => {
    const confirmLogout = window.confirm(
        "Are you sure you want to logout?"
    );
    if (!confirmLogout) return;
  dispatch(logout());
  navigate("/login");
  };


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
        {user ? (
          <>
            <div className="relative group">
  {/* Profile Button */}
  <button className="flex items-center gap-2 font-medium hover:text-blue-600 transition-colors">
    <UserIcon className="h-5 w-5" />
    <span>{user.name}</span>
    <ChevronDownIcon className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
  </button>

  {/* Dropdown */}
  <div
    className="absolute right-0 top-full pt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200
               opacity-0 invisible translate-y-2
               group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
               transition-all duration-200"
  >
    {/* Header */}
    <div className="px-4 py-3 border-b">
      <p className="font-semibold text-gray-800">{user.name}</p>
      <p className="text-sm text-gray-500">{user.email}</p>
    </div>

    {/* Links */}
    <Link
      to="/profile"
      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors"
    >
      <UserIcon className="h-5 w-5" />
      My Profile
    </Link>

    <Link
      to="/orders"
      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors"
    >
      <ShoppingBagIcon className="h-5 w-5" />
      My Orders
    </Link>

    <Link
      to="/reviews"
      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors"
    >
      <StarIcon className="h-5 w-5" />
      My Reviews
    </Link>

    <Link
      to="/history"
      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors"
    >
      <ClockIcon className="h-5 w-5" />
      Browsing History
    </Link>

    <Link
      to="/settings"
      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors"
    >
      <Cog6ToothIcon className="h-5 w-5" />
      Settings
    </Link>

    <button
      onClick={handleLogout}
      className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 border-t transition-colors"
    >
      <ArrowRightOnRectangleIcon className="h-5 w-5" />
      Logout
    </button>
  </div>
</div>
           </>
        ) : (
          <>
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
        </>
        )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;