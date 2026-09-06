import { NavLink } from "react-router-dom";
import ShopDropdown from "./ShopDropdown";

const MainNavigation = () => {
  const navLinkClass = ({ isActive }) =>
    `relative py-1 text-sm font-medium tracking-wide transition-colors duration-200 ${
      isActive
        ? "text-indigo-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-600"
        : "text-gray-700 hover:text-indigo-600 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-indigo-600 hover:after:w-full after:transition-all after:duration-300"
    }`;

  return (
    <nav className="hidden md:flex items-center space-x-8">
      <NavLink to="/" className={navLinkClass}>
        Home
      </NavLink>

      <ShopDropdown />

      <NavLink to="/new-arrivals" className={navLinkClass}>
        New Arrivals
      </NavLink>

      <NavLink to="/sale" className={navLinkClass}>
        Sale
      </NavLink>

      <NavLink to="/about" className={navLinkClass}>
        About
      </NavLink>
    </nav>
  );
};

export default MainNavigation;