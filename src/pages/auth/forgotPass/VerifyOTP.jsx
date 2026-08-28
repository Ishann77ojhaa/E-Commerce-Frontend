import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { VerifyOTP } from "../../../store/authSlice";
import { STATUSES } from "../../../globals/components/misc/statuses";

const VerifyOTPPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const email = useSelector((state) => state.auth.email);

    const [otp, setOtp] = useState(["", "", "", ""]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const inputRefs = useRef([]);

    const handleChange = (value, index) => {
        // Only allow numbers
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;

        setOtp(newOtp);
        setError("");
        setMessage("");

        // Move to next input
        if (value && index < otp.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        // Move backwards on backspace
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        // Move backwards with left arrow
        if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        // Move forward with right arrow
        if (e.key === "ArrowRight" && index < otp.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // Handle pasting complete OTP
    const handlePaste = (e) => {
        e.preventDefault();

        const pastedData = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, otp.length);

        if (!pastedData) return;

        const newOtp = [...otp];

        pastedData.split("").forEach((digit, index) => {
            newOtp[index] = digit;
        });

        setOtp(newOtp);

        const nextIndex = Math.min(
            pastedData.length,
            otp.length - 1
        );

        inputRefs.current[nextIndex]?.focus();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setMessage("");

        const otpCode = otp.join("");

        if (otpCode.length !== 4) {
            setError("Please enter the complete 4-digit OTP.");
            return;
        }

        if (!email) {
            setError("Email not found. Please request a new OTP.");
            return;
        }

        const result = await dispatch(
            VerifyOTP({
                user_email: email,
                otp: otpCode
            })
        );

        if (result) {
            setMessage("OTP verified successfully!");

            // Go to reset password page
            navigate("/reset-password");
        } else {
            setError("Invalid OTP. Please try again.");
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
        <main className="w-full min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">

                <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
                    Verify OTP
                </h2>

                <p className="text-center text-gray-600 mb-6 text-sm">
                    A 4-digit verification code has been sent to your email.
                </p>

                <form onSubmit={handleSubmit}>

                    {/* OTP Inputs */}
                    <div className="flex justify-center space-x-2 mb-6">

                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(element) => {
                                    inputRefs.current[index] = element;
                                }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) =>
                                    handleChange(e.target.value, index)
                                }
                                onKeyDown={(e) =>
                                    handleKeyDown(e, index)
                                }
                                onPaste={handlePaste}
                                className={`w-12 h-12 text-center text-2xl font-bold border rounded focus:outline-none focus:ring-2 ${
                                    error
                                        ? "border-red-500 focus:ring-red-200"
                                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                                }`}
                            />
                        ))}

                    </div>

                    {/* Error */}
                    {error && (
                        <p className="text-center text-sm text-red-600 mb-4">
                            {error}
                        </p>
                    )}

                    {/* Success */}
                    {message && (
                        <p className="text-center text-sm text-green-600 mb-4">
                            {message}
                        </p>
                    )}

                    {/* Verify Button */}
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
                    >
                        Verify Code
                    </button>

                </form>

                {/* Resend */}
                <div className="text-center text-sm mt-4">
                    <button
                        type="button"
                        className="font-bold text-blue-500 hover:text-blue-800"
                        onClick={() => {
                            navigate("/forgot-password");
                        }}
                    >
                        Resend Code
                    </button>
                </div>

                {/* Back to Login */}
                <div className="text-center mt-6">
                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="inline-block align-baseline font-bold text-sm text-gray-500 hover:text-gray-800"
                    >
                        Back to Login
                    </button>
                </div>

            </div>

        </main>
    );
};

export default VerifyOTPPage;
