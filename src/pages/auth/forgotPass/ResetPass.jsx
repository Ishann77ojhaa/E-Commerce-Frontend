
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ResetPassword } from "../../../store/authSlice";
import { STATUSES } from "../../../globals/components/misc/statuses";


const ResetPasswordPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Get verified email from Redux
    const email = useSelector((state) => state.auth.email);

    const [newpassword, setNewPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setMessage("");

        // Check email
        if (!email) {
            setError("Session expired. Please request OTP again.");
            return;
        }

        // Validation
        if (!newpassword || !confirmpassword) {
            setError("Please enter both passwords.");
            return;
        }

        if (newpassword.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        if (newpassword !== confirmpassword) {
            setError("Passwords do not match.");
            return;
        }

        // Call Redux thunk
        const result = await dispatch(
            ResetPassword({
                user_email: email,
                newpassword: newpassword,
                confirmpassword: confirmpassword
            })
        );

        if (result) {
            setMessage("Password reset successfully!");

            // Give user a moment to see success message
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } else {
            setError("Unable to reset password. Please try again.");
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
        <main className="w-full min-h-screen flex items-center justify-center px-4">

            <div className="max-w-sm w-full text-gray-600 space-y-5">

                {/* Heading */}
                <div className="text-center pb-3">

                    <h2 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                        Reset Password
                    </h2>

                    <p className="mt-3 text-sm text-gray-600">
                        Enter your new password below.
                    </p>

                    {email && (
                        <p className="mt-2 text-sm text-gray-500">
                            Resetting password for{" "}
                            <span className="font-medium text-gray-700">
                                {email}
                            </span>
                        </p>
                    )}

                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    {/* New Password */}
                    <div>

                        <label className="font-medium">
                            New Password
                        </label>

                        <div className="relative">

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                value={newpassword}
                                onChange={(e) => {
                                    setNewPassword(e.target.value);
                                    setError("");
                                    setMessage("");
                                }}
                                placeholder="Enter new password"
                                className={`w-full mt-2 px-3 py-2 pr-12 text-gray-500 bg-transparent outline-none border shadow-sm rounded-lg ${
                                    error
                                        ? "border-red-500"
                                        : "focus:border-red-600"
                                }`}
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-800"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>

                        </div>

                    </div>

                    {/* Confirm Password */}
                    <div>

                        <label className="font-medium">
                            Confirm Password
                        </label>

                        <div className="relative">

                            <input
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                value={confirmpassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    setError("");
                                    setMessage("");
                                }}
                                placeholder="Confirm new password"
                                className={`w-full mt-2 px-3 py-2 pr-12 text-gray-500 bg-transparent outline-none border shadow-sm rounded-lg ${
                                    error
                                        ? "border-red-500"
                                        : "focus:border-red-600"
                                }`}
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        !showConfirmPassword
                                    )
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-800"
                            >
                                {showConfirmPassword
                                    ? "Hide"
                                    : "Show"}
                            </button>

                        </div>

                    </div>

                    {/* Error */}
                    {error && (
                        <p className="text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    {/* Success */}
                    {message && (
                        <p className="text-sm text-green-600">
                            {message}
                        </p>
                    )}

                    {/* Reset Button */}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white font-medium bg-red-600 hover:bg-red-500 active:bg-red-600 rounded-lg duration-150"
                    >
                        Reset Password
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

export default ResetPasswordPage;
