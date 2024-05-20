import { FaUsers } from "react-icons/fa6";

const CustomerSatisfiedSection = () => {
  return (
    <><div>
        <h1 className="text-5xl bg-cyan-500 text-white text-center w-1/4 py-4 rounded-lg mx-auto my-5 font-bold">Our Achievements</h1>
    </div>
      <div className="max-w-screen-2xl px-8 gap-6 flex justify-between items-center  bg-slate-200 h-80 rounded-lg mx-auto">
        <div className="w-1/4  rounded-lg py-12 bg-white">
          <FaUsers className="text-7xl flex mx-auto text-orange-400"></FaUsers>
          <h1 className="text-2xl text-sky-400 font-semibold text-center">
            SATISFIED <br /> CUSTOMERS
          </h1>
          <h1 className="text-2xl font-semibold text-center">1587</h1>
        </div>
        <div className="w-1/4 rounded-lg py-12 bg-white">
          <FaUsers className="text-7xl flex mx-auto text-orange-400"></FaUsers>
          <h1 className="text-2xl text-sky-400 font-semibold text-center">
            QUALITY OF <br /> SERVICE
          </h1>
          <h1 className="text-2xl font-semibold text-center">99%</h1>
        </div>
        <div className="w-1/4 rounded-lg py-12 bg-white">
          <FaUsers className="text-7xl flex mx-auto text-orange-400"></FaUsers>
          <h1 className="text-2xl text-sky-400 font-semibold text-center">
            QUALITY <br /> CERTIFICATES
          </h1>
          <h1 className="text-2xl font-semibold text-center">17</h1>
        </div>
        <div className="w-1/4 rounded-lg py-12 bg-white">
          <FaUsers className="text-7xl flex mx-auto text-orange-400"></FaUsers>
          <h1 className="text-2xl text-sky-400 font-semibold text-center">
            AVAILABLE <br /> PRODUCTS
          </h1>
          <h1 className="text-2xl font-semibold text-center">22</h1>
        </div>
      </div>
    </>
  );
};

export default CustomerSatisfiedSection;
