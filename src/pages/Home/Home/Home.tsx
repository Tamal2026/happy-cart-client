import BestSellerProducts from "../../BestSellerProducts/BestSellerProducts";
import Features from "../../Features/Features";
import FreshFruitBanner from "../../FreshFruitBanner/FreshFruitBanner";
import AllProducts from "../AllProducts/AllProducts";
import CustomerSatisfiedSection from "../CustomerSatisfiedSection/CustomerSatisfiedSection";
import FAQ from "../FAQ/FAQ";
import Hero from "../Hero/Hero";
import Testimonial from "./Testimonial/Testimonial";

const Home = () => {
  return (
    <>
      <Hero></Hero>

      <AllProducts></AllProducts>
      <FreshFruitBanner></FreshFruitBanner>
      <BestSellerProducts></BestSellerProducts>
      <CustomerSatisfiedSection></CustomerSatisfiedSection>
      <Testimonial></Testimonial>
      <FAQ></FAQ>
      <Features></Features>
    </>
  );
};

export default Home;
