import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import Loader from "../../../globals/components/loader/loader";


const LatestArrivals = () => {
  const products = useSelector((state) => state.product.data);
  const status = useSelector((state) => state.product.status);

  const latestProducts = [...products]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">

        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Latest Arrivals
          </h2>

          <p className="text-gray-600">
            Fresh styles and new additions to our collection.
          </p>
        </div>

        {status === "loading" && (
          <Loader message="Loading products..."/>
        )}

        {status === "success" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        )}

        <div className="flex justify-center mt-10">
          <Link
            to="/new-arrivals"
            className="
              w-[276px]
              h-[68px]
              flex
              items-center
              justify-center
              border
              border-gray-300
              rounded-lg
              text-lg
              font-medium
              text-gray-900
              hover:bg-gray-50
              hover:border-gray-400
              transition-all
              duration-200
            "
          >
            View All Products
          </Link>
        </div>

      </div>
    </section>
  );
};

export default LatestArrivals;