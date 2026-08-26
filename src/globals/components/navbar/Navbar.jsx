import { useState } from "react";
import {
  ShoppingCartIcon,
  UserIcon,
  ShoppingBagIcon,
  StarIcon,
  ClockIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, logout } from "../../../store/authSlice";
import { fetchCart } from "../../../store/cartSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.data);
  const { items } = useSelector((state) => state.cart);

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    dispatch(logout());
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `relative py-1 text-[15px] font-medium transition-colors duration-200 ${
      isActive
        ? "text-blue-700"
        : "text-slate-600 hover:text-blue-700"
    }
    after:absolute after:left-0 after:-bottom-1 after:h-[2px]
    after:bg-blue-700 after:transition-all after:duration-200
    ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`;

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Navbar */}
        <div className="flex items-center justify-between h-[68px]">

          {/* Logo */}
          <Link
            to="/"
            className="text-[25px] font-bold tracking-tight text-slate-900"
          >
            Ish<span className="text-blue-700">Shop</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">

            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>

            <NavLink to="/shop" className={navLinkClass}>
              Shop
            </NavLink>

            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>

            <NavLink to="/services" className={navLinkClass}>
              Services
            </NavLink>

          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-6">

            {/* Cart */}
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `flex items-center gap-2 text-[15px] font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-blue-700"
                    : "text-slate-600 hover:text-blue-700"
                }`
              }
            >
              <span className="relative">

                <ShoppingCartIcon className="h-[22px] w-[22px]" />

                {items.length > 0 && (
                  <span
                    className="
                      absolute -top-2 -right-2
                      flex h-[17px] min-w-[17px]
                      items-center justify-center
                      rounded-full
                      bg-blue-700
                      px-1
                      text-[10px]
                      font-bold
                      leading-none
                      text-white
                    "
                  >
                    {items.length}
                  </span>
                )}

              </span>

              <span>Cart</span>
            </NavLink>

            {/* Logged In User */}
            {user ? (
              <div className="relative group">

                {/* Profile Button */}
                <button
                  type="button"
                  className="
                    flex items-center gap-2
                    text-[15px] font-medium
                    text-slate-700
                    hover:text-blue-700
                    transition-colors duration-200
                  "
                >
                  <span
                    className="
                      flex h-8 w-8
                      items-center justify-center
                      rounded-full
                      bg-slate-100
                      text-slate-600
                      group-hover:bg-blue-50
                      group-hover:text-blue-700
                      transition-colors
                    "
                  >
                    <UserIcon className="h-[17px] w-[17px]" />
                  </span>

                  <span className="max-w-[120px] truncate">
                    {user.user_Name}
                  </span>

                  <ChevronDownIcon
                    className="
                      h-4 w-4
                      text-slate-400
                      transition-transform duration-200
                      group-hover:rotate-180
                    "
                  />
                </button>

                {/* Profile Dropdown */}
                <div
                  className="
                    absolute right-0 top-full pt-3
                    w-64
                    opacity-0 invisible translate-y-1
                    group-hover:opacity-100
                    group-hover:visible
                    group-hover:translate-y-0
                    transition-all duration-150
                  "
                >
                  <div
                    className="
                      overflow-hidden
                      rounded-lg
                      border border-slate-200
                      bg-white
                      shadow-lg
                    "
                  >

                    {/* User Info */}
                    <div
                      className="
                        px-4 py-4
                        border-b border-slate-100
                        bg-slate-50
                      "
                    >
                      <div className="flex items-center gap-3">

                        <div
                          className="
                            flex h-9 w-9
                            items-center justify-center
                            rounded-full
                            bg-blue-50
                            text-blue-700
                          "
                        >
                          <UserIcon className="h-5 w-5" />
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-900 truncate">
                            {user.name}
                          </p>

                          <p className="text-xs text-slate-500 truncate">
                            {user.email}
                          </p>
                        </div>

                      </div>
                    </div>

                    {/* Account Links */}
                    <div className="py-1">

                      <Link
                        to="/profile"
                        className="
                          flex items-center gap-3
                          px-4 py-2.5
                          text-sm text-slate-700
                          hover:bg-slate-50
                          hover:text-blue-700
                          transition-colors
                        "
                      >
                        <UserIcon className="h-[17px] w-[17px] text-slate-400" />
                        My Profile
                      </Link>

                      <Link
                        to="/orders"
                        className="
                          flex items-center gap-3
                          px-4 py-2.5
                          text-sm text-slate-700
                          hover:bg-slate-50
                          hover:text-blue-700
                          transition-colors
                        "
                      >
                        <ShoppingBagIcon className="h-[17px] w-[17px] text-slate-400" />
                        My Orders
                      </Link>

                      <Link
                        to="/reviews"
                        className="
                          flex items-center gap-3
                          px-4 py-2.5
                          text-sm text-slate-700
                          hover:bg-slate-50
                          hover:text-blue-700
                          transition-colors
                        "
                      >
                        <StarIcon className="h-[17px] w-[17px] text-slate-400" />
                        My Reviews
                      </Link>

                      <Link
                        to="/history"
                        className="
                          flex items-center gap-3
                          px-4 py-2.5
                          text-sm text-slate-700
                          hover:bg-slate-50
                          hover:text-blue-700
                          transition-colors
                        "
                      >
                        <ClockIcon className="h-[17px] w-[17px] text-slate-400" />
                        Browsing History
                      </Link>

                      <Link
                        to="/settings"
                        className="
                          flex items-center gap-3
                          px-4 py-2.5
                          text-sm text-slate-700
                          hover:bg-slate-50
                          hover:text-blue-700
                          transition-colors
                        "
                      >
                        <Cog6ToothIcon className="h-[17px] w-[17px] text-slate-400" />
                        Settings
                      </Link>

                    </div>

                    {/* Logout */}
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="
                        w-full
                        flex items-center gap-3
                        px-4 py-2.5
                        text-sm text-red-600
                        hover:bg-red-50
                        border-t border-slate-100
                        transition-colors
                      "
                    >
                      <ArrowRightOnRectangleIcon className="h-[17px] w-[17px]" />
                      Logout
                    </button>

                  </div>
                </div>
              </div>

            ) : (

              /* Logged Out */
              <div className="flex items-center gap-2">

                <Link
                  to="/login"
                  className="
                    px-4 py-2
                    text-[15px] font-medium
                    text-slate-700
                    rounded-md
                    hover:text-blue-700
                    hover:bg-slate-50
                    transition-colors
                  "
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="
                    px-4 py-2
                    text-[15px] font-semibold
                    text-white
                    bg-blue-700
                    rounded-md
                    hover:bg-blue-800
                    transition-colors
                  "
                >
                  Sign Up
                </Link>

              </div>
            )}

          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-4 md:hidden">

            {/* Mobile Cart */}
            <NavLink
              to="/cart"
              className="relative text-slate-700 hover:text-blue-700"
            >
              <ShoppingCartIcon className="h-6 w-6" />

              {items.length > 0 && (
                <span
                  className="
                    absolute -top-2 -right-2
                    flex h-4 min-w-[16px]
                    items-center justify-center
                    rounded-full
                    bg-blue-700
                    px-1
                    text-[10px]
                    font-bold
                    text-white
                  "
                >
                  {items.length}
                </span>
              )}
            </NavLink>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="text-slate-700 hover:text-blue-700"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">

          <div className="px-4 py-4 space-y-1">

            <NavLink
              to="/"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2.5 rounded-md text-[15px] font-medium ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/shop"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2.5 rounded-md text-[15px] font-medium ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`
              }
            >
              Shop
            </NavLink>

            <NavLink
              to="/about"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2.5 rounded-md text-[15px] font-medium ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`
              }
            >
              About
            </NavLink>

            <NavLink
              to="/services"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2.5 rounded-md text-[15px] font-medium ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`
              }
            >
              Services
            </NavLink>

            {user ? (
              <>
                {/* Mobile User */}
                <div
                  className="
                    mt-3 mb-2
                    px-3 py-3
                    rounded-md
                    bg-slate-50
                    border border-slate-100
                  "
                >
                  <div className="flex items-center gap-3">

                    <div
                      className="
                        flex h-9 w-9
                        items-center justify-center
                        rounded-full
                        bg-blue-50
                        text-blue-700
                      "
                    >
                      <UserIcon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {user.name}
                      </p>

                      <p className="text-xs text-slate-500 truncate">
                        {user.email}
                      </p>
                    </div>

                  </div>
                </div>

                <Link
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-md text-[15px] text-slate-600 hover:bg-slate-50 hover:text-blue-700"
                >
                  <UserIcon className="h-5 w-5 text-slate-400" />
                  My Profile
                </Link>

                <Link
                  to="/orders"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-md text-[15px] text-slate-600 hover:bg-slate-50 hover:text-blue-700"
                >
                  <ShoppingBagIcon className="h-5 w-5 text-slate-400" />
                  My Orders
                </Link>

                <Link
                  to="/reviews"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-md text-[15px] text-slate-600 hover:bg-slate-50 hover:text-blue-700"
                >
                  <StarIcon className="h-5 w-5 text-slate-400" />
                  My Reviews
                </Link>

                <Link
                  to="/history"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-md text-[15px] text-slate-600 hover:bg-slate-50 hover:text-blue-700"
                >
                  <ClockIcon className="h-5 w-5 text-slate-400" />
                  Browsing History
                </Link>

                <Link
                  to="/settings"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-md text-[15px] text-slate-600 hover:bg-slate-50 hover:text-blue-700"
                >
                  <Cog6ToothIcon className="h-5 w-5 text-slate-400" />
                  Settings
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                  className="
                    w-full
                    flex items-center gap-3
                    px-3 py-2.5
                    rounded-md
                    text-[15px]
                    text-red-600
                    hover:bg-red-50
                    mt-1
                  "
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  Logout
                </button>
              </>

            ) : (

              <div className="flex flex-col gap-2 pt-3 mt-3 border-t border-slate-100">

                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="
                    px-3 py-2.5
                    rounded-md
                    text-[15px]
                    font-medium
                    text-center
                    text-slate-700
                    border border-slate-200
                    hover:bg-slate-50
                  "
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="
                    px-3 py-2.5
                    rounded-md
                    text-[15px]
                    font-semibold
                    text-center
                    text-white
                    bg-blue-700
                    hover:bg-blue-800
                  "
                >
                  Sign Up
                </Link>

              </div>
            )}

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;