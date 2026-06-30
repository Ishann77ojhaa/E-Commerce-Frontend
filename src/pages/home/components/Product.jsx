
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { add } from "../../../store/cartSlice";

export default function Product() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:2000/api/product");

      if (response.status === 200) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product)=>{
    dispatch(add(product));
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-4xl font-bold text-yellow-900">
            Popular Products
          </h2>

          <button className="text-blue-600 font-semibold hover:underline">
            View All →
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <img
                src={`http://${product.Product_Image}`}
                alt={product.Product_Name}
                className="w-full h-56 object-cover"
              />

              <div className="p-5 flex flex-col h-56">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {product.Product_Name}
                  </h3>

                  <p className="text-gray-600 mt-2 line-clamp-2">
                    {product.Product_Description}
                  </p>
                </div>

                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold text-gray-900">
                      Rs. {product.Product_Price}
                    </span>

                    <span
                      className={`text-sm font-medium ${
                        product.Product_Status === "Available"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {product.Product_Status}
                    </span>
                  </div>

                  <button onClick={() => addToCart(product)} className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No products found.
          </p>
        )}
      </div>
    </section>
  );
}
