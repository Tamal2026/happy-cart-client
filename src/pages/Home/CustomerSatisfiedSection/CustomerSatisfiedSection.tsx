import { FaUsers } from "react-icons/fa6";

const CustomerSatisfiedSection = () => {
  return (
    <><div className="text-2xl sm:text-3xl sm:mx-5 bg-cyan-500 text-white text-center py-4 my-5 font-bold mx-2 md:w-6/12 md:mx-auto lg:text-4xl rounded-lg">
    Our Achievements
  </div>
  
      <div className="max-w-screen-2xl px-4 md:px-8 gap-6 flex flex-col md:flex-row justify-center items-center bg-slate-200 md:h-80 rounded-lg mx-auto">
        <div className="w-full md:w-1/4 rounded-lg py-8 md:py-12 bg-white">
          <FaUsers className="text-5xl md:text-7xl flex mx-auto text-orange-400"></FaUsers>
          <h1 className="text-xl sm:text-2xl md:text-2xl text-sky-400 font-semibold text-center mt-4 md:mt-6">
            SATISFIED <br /> CUSTOMERS
          </h1>
          <h1 className="text-xl sm:text-2xl md:text-2xl font-semibold text-center">1587</h1>
        </div>
        <div className="w-full md:w-1/4 rounded-lg py-8 md:py-12 bg-white">
          <FaUsers className="text-5xl md:text-7xl flex mx-auto text-orange-400"></FaUsers>
          <h1 className="text-xl sm:text-2xl md:text-2xl text-sky-400 font-semibold text-center mt-4 md:mt-6">
            QUALITY OF <br /> SERVICE
          </h1>
          <h1 className="text-xl sm:text-2xl md:text-2xl font-semibold text-center">99%</h1>
        </div>
        <div className="w-full md:w-1/4 rounded-lg py-8 md:py-12 bg-white">
          <FaUsers className="text-5xl md:text-7xl flex mx-auto text-orange-400"></FaUsers>
          <h1 className="text-xl sm:text-2xl md:text-2xl text-sky-400 font-semibold text-center mt-4 md:mt-6">
            QUALITY <br /> CERTIFICATES
          </h1>
          <h1 className="text-xl sm:text-2xl md:text-2xl font-semibold text-center">17</h1>
        </div>
        <div className="w-full md:w-1/4 rounded-lg py-8 md:py-12 bg-white">
          <FaUsers className="text-5xl md:text-7xl flex mx-auto text-orange-400"></FaUsers>
          <h1 className="text-xl sm:text-2xl md:text-2xl text-sky-400 font-semibold text-center mt-4 md:mt-6">
            AVAILABLE <br /> PRODUCTS
          </h1>
          <h1 className="text-xl sm:text-2xl md:text-2xl font-semibold text-center">22</h1>
        </div>
      </div>
    </>
  );
};

export default CustomerSatisfiedSection;
