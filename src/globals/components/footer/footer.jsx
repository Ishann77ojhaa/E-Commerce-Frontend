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
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Column 1: Brand + About */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link
              to="/"
              className="text-2xl font-bold tracking-tight text-slate-900"
            >
              Ish<span className="text-blue-700">Shop</span>
            </Link>
            <p className=" mt-4 text-gray-600 mb-6 max-w-md">
              We offer premium quality clothing and accessories for men and
              women. Our mission is to provide sustainable fashion that lasts.
            </p>

            {/* Social Icons */}
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

          {/* Column 2: Shop */}
          <div>
            <h3 className={headingClass}>Shop</h3>
            <ul className="space-y-3">
              <li>
                <a href="/shop/women" className="text-gray-600 hover:text-primary transition-colors">
                  Women
                </a>
              </li>
              <li>
                <a href="/shop/men" className="text-gray-600 hover:text-primary transition-colors">
                  Men
                </a>
              </li>
              <li>
                <a href="/shop/accessories" className="text-gray-600 hover:text-primary transition-colors">
                  Accessories
                </a>
              </li>
              <li>
                <a href="/shop/footwear" className="text-gray-600 hover:text-primary transition-colors">
                  Footwear
                </a>
              </li>
              <li>
                <a href="/new-arrivals" className="text-gray-600 hover:text-primary transition-colors">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="/sale" className="text-gray-600 hover:text-primary transition-colors">
                  Sale
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Help */}
          <div>
            <h3 className={headingClass}>Help</h3>
            <ul className="space-y-3">
              <li>
                <a href="/customer-service" className="text-gray-600 hover:text-primary transition-colors">
                  Customer Service
                </a>
              </li>
              <li>
                <a href="/account" className="text-gray-600 hover:text-primary transition-colors">
                  My Account
                </a>
              </li>
              <li>
                <a href="/stores" className="text-gray-600 hover:text-primary transition-colors">
                  Find a Store
                </a>
              </li>
              <li>
                <a href="/shipping-returns" className="text-gray-600 hover:text-primary transition-colors">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="/faqs" className="text-gray-600 hover:text-primary transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: About */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">About</h3>
            <ul className="space-y-3">
              <li>
                <a href="/about" className="text-gray-600 hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/dosc" className="text-gray-600 hover:text-primary transition-colors">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="/careers" className="text-gray-600 hover:text-primary transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="/press" className="text-gray-600 hover:text-primary transition-colors">
                  Press
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-600 hover:text-primary transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {year} IshShop. All rights reserved.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/privacy" 
              className={linkClass}>
                Privacy Policy
              </Link>
              <Link to="/terms" className={linkClass}>
                Terms of Service
              </Link>
              <Link to="/cookies" className={linkClass}>
                Cookies Settings
              </Link>
            </div>

            {/* Payment Icons */}
            <div className="flex items-center space-x-3">
              <i className="ri-visa-fill text-2xl text-gray-600"></i>
              <i className="ri-mastercard-fill text-2xl text-gray-600"></i>
              <i className="ri-paypal-fill text-2xl text-gray-600"></i>
              <i className="ri-apple-fill text-2xl text-gray-600"></i>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;