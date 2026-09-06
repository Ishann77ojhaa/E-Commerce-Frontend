import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  UserIcon,
  ShoppingBagIcon,
  StarIcon,
  ClockIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { logout } from "../../store/authSlice";

const AccountDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.data);

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (!confirmLogout) return;

    dispatch(logout());
    setOpen(false);
    navigate("/login");
  };

  // User is not logged in
  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          to="/login"
          className="px-5 py-2 text-xs font-semibold tracking-wider text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-200"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="px-5 py-2 text-xs font-semibold tracking-wider text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-200"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  // User is logged in
  return (
    <div className="relative">
      {/* Account Button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
          flex items-center gap-2
          text-gray-700
          hover:text-indigo-600
          transition-colors
        "
      >
        <UserIcon className="w-5 h-5" />

        <span className="hidden lg:block max-w-[120px] truncate text-sm font-medium">
          {user.user_Name}
        </span>

        <ChevronDownIcon
          className={`w-4 h-4 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute right-0 top-full mt-4
            w-64
            bg-white
            border border-gray-100
            rounded-lg
            shadow-lg
            overflow-hidden
          "
        >
          {/* User Info */}
          <div className="px-4 py-4 bg-gray-50 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div
                className="
                  flex items-center justify-center
                  w-10 h-10
                  rounded-full
                  bg-indigo-50
                  text-indigo-600
                "
              >
                <UserIcon className="w-5 h-5" />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {user.user_Name}
                </p>

                <p className="text-xs text-gray-500 truncate">
                  {user.user_Email}
                </p>
              </div>
            </div>
          </div>

          {/* Account Links */}
          <div className="py-2">
            <Link
              to="/profile"
              onClick={() => setOpen(false)}
              className="
                flex items-center gap-3
                px-4 py-2.5
                text-sm text-gray-700
                hover:bg-gray-50
                hover:text-indigo-600
                transition-colors
              "
            >
              <UserIcon className="w-5 h-5 text-gray-400" />
              My Profile
            </Link>

            <Link
              to="/orders"
              onClick={() => setOpen(false)}
              className="
                flex items-center gap-3
                px-4 py-2.5
                text-sm text-gray-700
                hover:bg-gray-50
                hover:text-indigo-600
                transition-colors
              "
            >
              <ShoppingBagIcon className="w-5 h-5 text-gray-400" />
              My Orders
            </Link>

            <Link
              to="/reviews"
              onClick={() => setOpen(false)}
              className="
                flex items-center gap-3
                px-4 py-2.5
                text-sm text-gray-700
                hover:bg-gray-50
                hover:text-indigo-600
                transition-colors
              "
            >
              <StarIcon className="w-5 h-5 text-gray-400" />
              My Reviews
            </Link>

            <Link
              to="/history"
              onClick={() => setOpen(false)}
              className="
                flex items-center gap-3
                px-4 py-2.5
                text-sm text-gray-700
                hover:bg-gray-50
                hover:text-indigo-600
                transition-colors
              "
            >
              <ClockIcon className="w-5 h-5 text-gray-400" />
              Browsing History
            </Link>

            <Link
              to="/settings"
              onClick={() => setOpen(false)}
              className="
                flex items-center gap-3
                px-4 py-2.5
                text-sm text-gray-700
                hover:bg-gray-50
                hover:text-indigo-600
                transition-colors
              "
            >
              <Cog6ToothIcon className="w-5 h-5 text-gray-400" />
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
              border-t border-gray-100
              text-sm text-red-600
              hover:bg-red-50
              transition-colors
            "
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;
