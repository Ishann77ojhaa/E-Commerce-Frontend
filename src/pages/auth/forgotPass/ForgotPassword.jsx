import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ForgotPass } from "../../../store/authSlice";
import { STATUSES } from "../../../globals/components/misc/statuses";


const ForgotPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setMessage("");

        if (!email.trim()) {
            setError("Email is required");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError("Enter a valid email address");
    return;
}

        const result = await dispatch(
            ForgotPass({
                user_email: email
            })
        );

        if (result) {
            // Navigate to OTP page
            navigate("/verify-otp");
        } else {
            setError("Unable to send OTP. Please try again.");
        }
    };

    // Loading
  if (STATUSES.LOADING) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader message="Loading..."/>
      </div>
    );
  }
    return (
        <main className="w-full min-h-screen flex flex-col items-center justify-center px-4">
            <div className="max-w-sm w-full text-gray-600 space-y-5">

                <div className="text-center pb-5">
                    <h2 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                        Forgot Password?
                    </h2>

                    <p className="mt-3 text-sm text-gray-600">
                        Enter your email address below and we'll send you an OTP
                        to reset your password.
                    </p>
                </div>

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

                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white font-medium bg-red-600 hover:bg-red-500 active:bg-red-600 rounded-lg duration-150"
                    >
                        Send OTP
                    </button>
                </form>

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