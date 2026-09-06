import { Link } from "react-router-dom"; // or use <a> if you're not using React Router yet

const CategoryCard = ({ title, image, link }) => {
  return (
    <Link to={link} className="group block">
      <div className="relative overflow-hidden rounded-lg aspect-[3/4]">
        <img
          src={image}
          alt={`${title} Collection`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20 flex items-end p-6">
          <div>
            <h3 className="text-xl font-semibold text-white mb-1">{title}</h3>
            <p className="text-white/80 text-sm">View Collection</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;