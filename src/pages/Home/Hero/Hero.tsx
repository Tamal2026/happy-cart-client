import img from "../../../../public/assets/hero-img.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Hero = () => {
  return (
    <div
      className="flex justify-evenly bg-cover my-7 bg-center "
      style={{
        backgroundImage: `url(${img})`,
        height: "500px",
        width: "1900px",
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
        <Carousel className="w-[720px] h-full"
        
        autoPlay={true}
        interval={2500}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        showArrows={false}>
          
          <div>
            <img  src="https://i.ibb.co/DrQ1Zr4/hero-img-1.png" />
          </div>
          <div>
            <img src="https://i.ibb.co/HqNdyrM/hero-img2.jpg" />
          </div>
          <div>
            <img className="h-[400px]" src="https://i.ibb.co/thd146j/meat-main.jpg" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Hero;
