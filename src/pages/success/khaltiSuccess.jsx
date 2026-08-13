import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const KhaltiSuccess = () => {
  
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">

        <FaCheckCircle className="text-green-500 text-7xl mx-auto mb-5" />

        <h1 className="text-3xl font-bold text-gray-800">
          Payment Successful
        </h1>

        <p className="text-gray-600 mt-3">
          Thank you! Your payment has been completed successfully.
        </p>

        <div className="mt-8 flex gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate("/myorders")}
            className="flex-1 border border-gray-300 hover:bg-gray-100 py-2 rounded-lg"
          >
            My Orders
          </button>
        </div>

      </div>
    </div>
  );
};

export default KhaltiSuccess;