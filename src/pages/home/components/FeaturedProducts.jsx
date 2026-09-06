import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import Loader from "../../../globals/components/loader/loader";




const FeaturedProducts = () => {
  const {data: products, status} = useSelector((state)=>state.product);


  if(status === "loading"){
   return <Loader message = "Please Wait"/>
  }
  else if(status === "error"){
    return <h1> Something Went Wrong!! </h1>
  }

  return (
    <section className="py-16">

      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="flex justify-between items-end mb-10">

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Featured Products
            </h2>

            <p className="text-gray-600">
              Our most popular picks, just for you.
            </p>
          </div>

        </div>

        {/* Products */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-6
          "
        >
          {products.slice(0,4).map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>

        <div className="flex justify-center mt-10">
  <a
    href="/new-arrivals"
    className="
      w-65
      h-12
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
  </a>
</div>
      </div>

    </section>
  );
};

export default FeaturedProducts;

