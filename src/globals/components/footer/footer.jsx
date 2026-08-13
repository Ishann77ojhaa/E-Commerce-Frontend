import { Link } from "react-router-dom";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

// Social Icons
const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M13.5 22v-8.5h2.85l.43-3.31H13.5V8.05c0-.96.27-1.61 1.64-1.61h1.75V3.48A23.6 23.6 0 0 0 14.5 3.35c-2.5 0-4.21 1.53-4.21 4.34v2.5H7.5v3.31h2.79V22h3.21Z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    {...props}
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle
      cx="17.4"
      cy="6.6"
      r="1"
      fill="currentColor"
      stroke="none"
    />
  </svg>
);

const XIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.9 3H21l-6.55 7.49L22.2 21h-6.14l-4.8-6.27L5.7 21H3.6l7.02-8.02L3 3h6.28l4.34 5.73L18.9 3Zm-1.08 16.17h1.17L7.75 4.75H6.5l11.32 14.42Z" />
  </svg>
);

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/Ishann77.Ojhaa",
    icon: FacebookIcon,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/07_ishphenox/",
    icon: InstagramIcon,
  },
  {
    name: "X",
    href: "https://x.com/Ishannnn777",
    icon: XIcon,
  },
];

const linkClass =
  "text-sm text-slate-600 hover:text-blue-700 transition-colors duration-200";

const headingClass =
  "mb-4 text-sm font-semibold uppercase tracking-wide text-slate-900";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-6">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link
              to="/"
              className="text-2xl font-bold tracking-tight text-slate-900"
            >
              Ish<span className="text-blue-700">Shop</span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
              Your simple and reliable online shopping destination.
              Discover quality products, fair prices, and an easy
              shopping experience.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="flex h-9 w-9 items-center justify-center rounded-full
                             border border-slate-200 text-slate-500
                             transition-all duration-200
                             hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className={headingClass}>Shop</h3>

            <ul className="space-y-3">
              <li>
                <Link to="/products" className={linkClass}>
                  All Products
                </Link>
              </li>

              <li>
                <Link to="/categories" className={linkClass}>
                  Categories
                </Link>
              </li>

              <li>
                <Link to="/new-arrivals" className={linkClass}>
                  New Arrivals
                </Link>
              </li>

              <li>
                <Link to="/best-sellers" className={linkClass}>
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className={headingClass}>Support</h3>

            <ul className="space-y-3">
              <li>
                <Link to="/contact" className={linkClass}>
                  Contact Us
                </Link>
              </li>

              <li>
                <Link to="/orders" className={linkClass}>
                  My Orders
                </Link>
              </li>

              <li>
                <Link to="/shipping-information" className={linkClass}>
                  Shipping Information
                </Link>
              </li>

              <li>
                <Link to="/returns-refunds" className={linkClass}>
                  Returns & Refunds
                </Link>
              </li>

              <li>
                <Link to="/faq" className={linkClass}>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className={headingClass}>Account</h3>

            <ul className="space-y-3">
              <li>
                <Link to="/profile" className={linkClass}>
                  My Profile
                </Link>
              </li>

              <li>
                <Link to="/cart" className={linkClass}>
                  Cart
                </Link>
              </li>

              <li>
                <Link to="/wishlist" className={linkClass}>
                  Wishlist
                </Link>
              </li>

              <li>
                <Link to="/login" className={linkClass}>
                  Login / Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className={headingClass}>Contact</h3>

            <ul className="space-y-4">

              <li>
                <a
                  href="mailto:support@ishshop.com"
                  className={`flex items-start gap-2 ${linkClass}`}
                >
                  <EnvelopeIcon className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />

                  <span>support@ishshop.com</span>
                </a>
              </li>

              <li>
                <a
                  href="tel:+9779800000000"
                  className={`flex items-start gap-2 ${linkClass}`}
                >
                  <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />

                  <span>+977 9746359298</span>
                </a>
              </li>

              <li className="flex items-start gap-2 text-sm text-slate-600">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />

                <span>Nepal</span>
              </li>

            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-slate-200" />

        {/* Bottom */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">

          <p className="text-center text-sm text-slate-500 sm:text-left">
            © {year} IshShop. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link
              to="/privacy-policy"
              className={linkClass}
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms-and-conditions"
              className={linkClass}
            >
              Terms & Conditions
            </Link>

            <Link
              to="/refund-policy"
              className={linkClass}
            >
              Refund Policy
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;