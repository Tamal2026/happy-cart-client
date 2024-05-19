import BestSellerProducts from "../../BestSellerProducts/BestSellerProducts";
import Features from "../../Features/Features";
import AllProducts from "../AllProducts/AllProducts";
import Hero from "../Hero/Hero";

const Home = () => {
  return (
    <>
      <Hero></Hero>
      <Features></Features>
      <AllProducts></AllProducts>
      <BestSellerProducts></BestSellerProducts>
    </>
  );
};

export default Home;
