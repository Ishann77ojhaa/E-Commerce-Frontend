import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    // Validation
    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address");
      return;
    }

    // Backend API will go here
    // Example:
    //
    // const response = await axios.post(
    //   "/api/auth/forgot-password",
    //   { email }
    // );

    setMessage(
      "If an account exists with this email, a password reset link will be sent."
    );
  };

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center px-4">

      <div className="max-w-sm w-full text-gray-600 space-y-5">

        {/* Heading */}
        <div className="text-center pb-5">

          <h2 className="text-gray-800 text-2xl font-bold sm:text-3xl">
            Forgot Password?
          </h2>

          <p className="mt-3 text-sm text-gray-600">
            Enter your email address below and we'll send you a
            link to reset your password.
          </p>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <div>

            <label className="font-medium">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
                setMessage("");
              }}
              placeholder="your@example.com"
              className={`w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border shadow-sm rounded-lg ${
                error
                  ? "border-red-500"
                  : "focus:border-red-600"
              }`}
            />

            {error && (
              <p className="mt-1 text-sm text-red-600">
                {error}
              </p>
            )}

            {message && (
              <p className="mt-1 text-sm text-green-600">
                {message}
              </p>
            )}

          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white font-medium bg-red-600 hover:bg-red-500 active:bg-red-600 rounded-lg duration-150"
          >
            Send Reset Link
          </button>

        </form>

        {/* Back to Login */}
        <div className="text-center">

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="font-medium text-red-600 hover:text-red-500"
          >
            Back to Login
          </button>

        </div>

      </div>

    </main>
  );
};

export default ForgotPassword;