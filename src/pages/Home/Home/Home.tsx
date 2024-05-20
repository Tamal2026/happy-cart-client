import BestSellerProducts from "../../BestSellerProducts/BestSellerProducts";
import Features from "../../Features/Features";
import FreshFruitBanner from "../../FreshFruitBanner/FreshFruitBanner";
import AllProducts from "../AllProducts/AllProducts";
import CustomerSatisfiedSection from "../CustomerSatisfiedSection/CustomerSatisfiedSection";
import Hero from "../Hero/Hero";

const Home = () => {
  return (
    <>
      <Hero></Hero>

      <AllProducts></AllProducts>
      <FreshFruitBanner></FreshFruitBanner>
      <BestSellerProducts></BestSellerProducts>
      <CustomerSatisfiedSection></CustomerSatisfiedSection>
      <Features></Features>
    </>
  );
};

export default Home;
