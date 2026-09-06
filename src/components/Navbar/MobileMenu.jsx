import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
    setShopOpen(false);
  };

  return (
    <div className="md:hidden">

      {/* Menu Button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="text-gray-700 hover:text-indigo-600 transition-colors"
        aria-label="Toggle menu"
      >
        {open ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <Bars3Icon className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Menu */}
      {open && (
        <div
          className="
            absolute
            top-20
            left-0
            right-0
            bg-white
            border-t
            border-gray-100
            shadow-lg
            md:hidden
          "
        >
          <nav className="px-6 py-5">

            {/* Shop */}
            <div className="border-b border-gray-100">

              <button
                type="button"
                onClick={() => setShopOpen((prev) => !prev)}
                className="
                  w-full
                  flex
                  items-center
                  justify-between
                  py-3
                  text-sm
                  font-medium
                  text-gray-800
                "
              >
                Shop

                <ChevronDownIcon
                  className={`w-4 h-4 transition-transform ${
                    shopOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {shopOpen && (
                <div className="pb-3 pl-4">

                  <Link
                    to="/shop/women"
                    onClick={closeMenu}
                    className="block py-2 text-sm text-gray-600 hover:text-indigo-600"
                  >
                    Women
                  </Link>

                  <Link
                    to="/shop/men"
                    onClick={closeMenu}
                    className="block py-2 text-sm text-gray-600 hover:text-indigo-600"
                  >
                    Men
                  </Link>

                  <Link
                    to="/shop/accessories"
                    onClick={closeMenu}
                    className="block py-2 text-sm text-gray-600 hover:text-indigo-600"
                  >
                    Accessories
                  </Link>

                  <Link
                    to="/shop/footwear"
                    onClick={closeMenu}
                    className="block py-2 text-sm text-gray-600 hover:text-indigo-600"
                  >
                    Footwear
                  </Link>

                </div>
              )}

            </div>

            {/* New Arrivals */}
            <Link
              to="/new-arrivals"
              onClick={closeMenu}
              className="
                block
                py-4
                text-sm
                font-medium
                text-gray-800
                border-b
                border-gray-100
                hover:text-indigo-600
              "
            >
              New Arrivals
            </Link>

            {/* Sale */}
            <Link
              to="/sale"
              onClick={closeMenu}
              className="
                block
                py-4
                text-sm
                font-medium
                text-gray-800
                border-b
                border-gray-100
                hover:text-indigo-600
              "
            >
              Sale
            </Link>

            {/* About */}
            <Link
              to="/about"
              onClick={closeMenu}
              className="
                block
                py-4
                text-sm
                font-medium
                text-gray-800
                hover:text-indigo-600
              "
            >
              About
            </Link>

          </nav>
        </div>
      )}

    </div>
  );
};

export default MobileMenu;
