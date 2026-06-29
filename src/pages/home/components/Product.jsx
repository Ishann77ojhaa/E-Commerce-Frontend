export default function Product() {
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

          {/* Product Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">

            <img
              src="https://images.unsplash.com/photo-1674296115670-8f0e92b1fddb?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80"
              alt="Product"
              className="w-full h-56 object-cover"
            />

            <div className="p-5">

              <h3 className="text-xl font-semibold text-gray-800">
                Product Name
              </h3>

              <p className="text-gray-600 mt-2">
                Product description goes here.
              </p>

              <div className="flex items-center justify-between mt-5">

                <div>
                  <span className="text-xl font-bold text-gray-900">
                    $20.00
                  </span>

                  <span className="ml-2 text-gray-500 line-through">
                    $25.00
                  </span>
                </div>

                <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-lg transition">
                  Add to Cart
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}