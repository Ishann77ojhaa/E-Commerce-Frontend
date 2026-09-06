import SaleBanner from "../../components/Banner/SaleBanner"
import CategorySection from "../../components/category/CategorySection"
import InstagramFeed from "../../components/Inst/InstaFeed"
import Newsletter from "../../components/newsletter/Newsletter"
import CustomerSay from "../../components/UsersSay/CustomerSay"
import FeaturedProducts from "./components/FeaturedProducts"
import Hero from "./components/Hero"
import LatestArrivals from "./components/LatestArrivals"
import Product from "./components/Product"

const Home = () => {
  return (
    <>
    <Hero/>
    <CategorySection/>
    <FeaturedProducts/>
    <SaleBanner/>
    <LatestArrivals/>
    <CustomerSay/>
    <InstagramFeed/>
    <Newsletter/>
    </>
  )
}

export default Home