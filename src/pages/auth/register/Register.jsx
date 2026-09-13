import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, setStatus } from "../../../store/authSlice";
import { STATUSES } from "../../../globals/components/misc/statuses";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);

  useEffect(() => {
    if (status === STATUSES.SUCCESS) {
      navigate("/login");
      dispatch(setStatus(STATUSES.IDLE));
    }
    if (status === STATUSES.ERROR) {
      alert("Registration failed");
      dispatch(setStatus(STATUSES.IDLE));
    }
  }, [status, navigate, dispatch]);

  const [userData, setUserData] = useState({
    user_name: "",
    user_phone: "",
    user_email: "",
    user_password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(userData));
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-slate-50">
      <div className="w-full max-w-md p-8 bg-white border border-slate-100 shadow-xl rounded-2xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Please fill in your details to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-semibold text-slate-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              name="user_name"
              onChange={handleChange}
              className="w-full px-4 py-3 text-sm transition-all duration-200 bg-white border rounded-lg border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-slate-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-slate-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              name="user_email"
              onChange={handleChange}
              className="w-full px-4 py-3 text-sm transition-all duration-200 bg-white border rounded-lg border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-slate-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-slate-700">
              Phone Number
            </label>
            <input
              type="number"
              placeholder="1234567890"
              name="user_phone"
              onChange={handleChange}
              className="w-full px-4 py-3 text-sm transition-all duration-200 bg-white border rounded-lg border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-slate-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-slate-700">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              name="user_password"
              onChange={handleChange}
              className="w-full px-4 py-3 text-sm transition-all duration-200 bg-white border rounded-lg border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-slate-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={status === STATUSES.LOADING}
            className="w-full py-3.5 px-4 text-sm font-semibold text-white transition-all duration-200 rounded-lg bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {status === STATUSES.LOADING ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-xs text-center text-slate-500">
          Already have an account?{" "}
          <span 
            onClick={() => navigate("/login")} 
            className="font-medium text-blue-600 cursor-pointer hover:underline"
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;