import { useSelector } from "react-redux";
import ProductCard from "../home/components/ProductCard";


const NewArrivals = () => {
  const products = useSelector((state) => state.product.data);
  const status = useSelector((state) => state.product.status);

  const newProducts = [...products].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            New Arrivals
          </h1>

          <p className="text-gray-600">
            Discover the latest products added to our collection.
          </p>
        </div>

        {status === "loading" && (
          <p className="text-center">Loading products...</p>
        )}

        {status === "success" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        )}

        {status === "success" && newProducts.length === 0 && (
          <p className="text-center text-gray-500">
            No products available.
          </p>
        )}

      </div>
    </section>
  );
};

export default NewArrivals;