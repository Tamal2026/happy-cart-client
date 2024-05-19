import BestSellerProducts from "../../BestSellerProducts/BestSellerProducts";
import Features from "../../Features/Features";
import FreshFruitBanner from "../../FreshFruitBanner/FreshFruitBanner";
import AllProducts from "../AllProducts/AllProducts";
import Hero from "../Hero/Hero";

const Home = () => {
  return (
    <>
      <Hero></Hero>

      <AllProducts></AllProducts>
      <FreshFruitBanner></FreshFruitBanner>
      <BestSellerProducts></BestSellerProducts>
      <Features></Features>
    </>
  );
};

export default Home;
