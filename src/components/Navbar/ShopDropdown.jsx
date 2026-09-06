import { Link } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const ShopDropdown = () => {
  return (
    <div className="relative group">

      <button
        className="
          flex items-center gap-1
          text-sm font-medium
          text-gray-700
          hover:text-indigo-600
          transition-colors
        "
      >
        Shop

        <ChevronDownIcon
          className="w-4 h-4 transition-transform group-hover:rotate-180"
        />
      </button>

      <div
        className="
          absolute left-0 top-full pt-3
          invisible opacity-0 translate-y-1
          group-hover:visible
          group-hover:opacity-100
          group-hover:translate-y-0
          transition-all duration-200
          w-48
        "
      >
        <div className="bg-white border border-gray-100 rounded-lg shadow-lg py-2">

          <Link
            to="/shop/women"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
          >
            Women
          </Link>

          <Link
            to="/shop/men"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
          >
            Men
          </Link>

          <Link
            to="/shop/accessories"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
          >
            Accessories
          </Link>

          <Link
            to="/shop/footwear"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
          >
            Footwear
          </Link>

        </div>
      </div>

    </div>
  );
};

export default ShopDropdown;