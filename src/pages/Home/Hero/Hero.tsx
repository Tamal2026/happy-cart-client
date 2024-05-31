import img from "../../../../public/assets/hero-img.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Hero = () => {
  return (
    <div
      className="flex justify-evenly bg-cover my-7 bg-center"
      style={{
        backgroundImage: `url(${img})`,
        height: "500px",
        width: "100%",
      }}
    >
      <div>
        <h1 className="text-orange-400 mt-7 ml-10 text-xl font-semibold">
          100% Organic Foods
        </h1>
        <h1 className="text-6xl font-bold text-green-600">Organic Veggies &</h1>
        <h1 className="text-6xl font-bold text-green-600">Fruits Foods</h1>
      </div>

      <div>
        <Carousel
          className="w-[720px] h-64"
          autoPlay={true}
          interval={3000} 
          infiniteLoop={true} 
          showStatus={false} 
          showThumbs={false} 
        >
          <div>
            <img src="https://i.ibb.co/DrQ1Zr4/hero-img-1.png" alt="Slide 1" />
          </div>
          <div>
            <img src="https://i.ibb.co/HqNdyrM/hero-img2.jpg" alt="Slide 2" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Hero;
