import img from "../../../../public/assets/hero-img.jpg";

const Hero = () => {
  return (
    <div
      className="flex justify-center bg-cover bg-center my-4"
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
      <div className="carousel w-1/2 ">
        <div id="slide1" className="carousel-item relative w-full ">
          <img
            className="h-[500px] mx-auto w-[800px]"
            src="../../../../public/assets/hero-img-1.png"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2   top-1/2">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img
            src="../../../../public/assets/hero-img2.jpg"
            className="mx-auto h-[500px] w-[800px]"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2  top-1/2">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Hero;
