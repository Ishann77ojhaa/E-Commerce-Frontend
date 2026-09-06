import { useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

const SearchDropDown = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    console.log("Searching for:", search);

    // Later:
    // navigate(`/shop?search=${search}`);
  };

  return (
    <div className="relative">
      {/* Search Button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-900 hover:text-white transition-all duration-200"
        aria-label="Search"
      >
        {open ? (
          <XMarkIcon className="w-5 h-5" />
        ) : (
          <MagnifyingGlassIcon className="w-5 h-5" />
        )}
      </button>

      {/* Search Dropdown */}
      {open && (
        <div
          className="
            absolute right-0 top-full mt-4
            w-72
            bg-white
            border border-gray-100
            rounded-lg
            shadow-lg
            p-4
          "
        >
          <form onSubmit={handleSearch}>
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                autoFocus
                className="
                  flex-1
                  px-3 py-2
                  text-sm
                  text-gray-700
                  outline-none
                  placeholder:text-gray-400
                "
              />

              <button
                type="submit"
                className="
                  px-3 py-2
                  text-indigo-600
                  hover:bg-indigo-50
                  transition-colors
                "
                aria-label="Submit search"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SearchDropDown;
