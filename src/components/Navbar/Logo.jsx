import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to="/"
      className="text-2xl font-bold tracking-tight text-gray-900"
    >
      Ish<span className="text-indigo-600">Shop</span>
    </Link>
  );
};

export default Logo;