import Logo from "./Logo";
import SearchDropDown from "./SearchDropDown";
import AccountDropdown from "./AccountDropdown";
import CartDropdown from "./CartDropdown";
import MobileMenu from "./MobileMenu";
import MainNavigation from "./MainNavigation";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <MainNavigation />

          {/* Right Side */}
          <div className="flex items-center space-x-5">
            <SearchDropDown />
            <AccountDropdown />
            <CartDropdown />
            <MobileMenu />
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;