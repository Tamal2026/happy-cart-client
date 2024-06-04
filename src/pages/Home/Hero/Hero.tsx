
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Hero = () => {
  return (
    <div className="bg-cover bg-center sm:my-3 md:my-5 my-7">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between py-16 sm:py-24 lg:py-32">
          <div className="sm:w-1/2">
            <h1 className="text-orange-400 mt-7 text-2xl sm:text-3xl lg:text-4xl font-semibold">
              100% Organic Foods
            </h1>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-green-600">Organic Veggies &</h1>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-green-600">Fruits Foods</h1>
          </div>

          <div className="sm:w-1/2 mt-8 sm:mt-0">
            <Carousel
              className="w-full"
              autoPlay={true}
              interval={2500}
              infiniteLoop={true}
              showThumbs={false}
              showStatus={false}
              showArrows={false}
            >
              <div>
                <img src="https://i.ibb.co/DrQ1Zr4/hero-img-1.png" />
              </div>
              <div>
                <img src="https://i.ibb.co/HqNdyrM/hero-img2.jpg" />
              </div>
             
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
