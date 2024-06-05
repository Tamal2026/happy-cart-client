import { BiSupport, BiTransfer } from "react-icons/bi";
import { FaShippingFast } from "react-icons/fa";
import { MdOutlineSecurityUpdateGood } from "react-icons/md";

const Features = () => {
  return (
    <>
      <h1 className="text-3xl md:text-5xl font-serif font-bold bg-lime-500 text-white w-full md:w-1/4 mx-auto my-5 py-3 rounded-lg text-center">
        Elite Benefits
      </h1>
      <div className="flex flex-col md:flex-row justify-center items-center max-w-screen-2xl my-3 mx-auto">
        <div className="flex flex-col items-center md:w-full md:max-w-[350px] md:mx-3 mb-6 md:mb-0">
          <div className="h-[200px] md:h-[220px] rounded-md text-4xl md:text-5xl flex flex-col justify-center items-center text-white w-full bg-slate-400">
            <FaShippingFast />
            <h2 className="text-lg md:text-xl font-bold mt-4">Free Shipping</h2>
            <h2 className="text-sm md:text-base font-semibold">Free on orders over $300</h2>
          </div>
        </div>
        <div className="flex flex-col items-center md:w-full md:max-w-[350px] md:mx-3 mb-6 md:mb-0">
          <div className="h-[200px] md:h-[220px] rounded-md text-4xl md:text-5xl flex flex-col justify-center items-center text-white w-full bg-slate-400">
            <MdOutlineSecurityUpdateGood />
            <h1 className="text-lg md:text-xl font-bold mt-4">Security Payment</h1>
            <h1 className="text-sm md:text-base font-semibold">100% secure payment</h1>
          </div>
        </div>
        <div className="flex flex-col items-center md:w-full md:max-w-[350px] md:mx-3 mb-6 md:mb-0">
          <div className="h-[200px] md:h-[220px] rounded-md text-4xl md:text-5xl flex flex-col justify-center items-center text-white w-full bg-slate-400">
            <BiTransfer />
            <h1 className="text-lg md:text-xl font-bold mt-4">30 Day Return</h1>
            <h1 className="text-sm md:text-base font-semibold">30-day money-back guarantee</h1>
          </div>
        </div>
        <div className="flex flex-col items-center md:w-full md:max-w-[350px] md:mx-3 mb-6 md:mb-0">
          <div className="h-[200px] md:h-[220px] rounded-md text-4xl md:text-5xl flex flex-col justify-center items-center text-white w-full bg-slate-400">
            <BiSupport />
            <h1 className="text-lg md:text-xl font-bold mt-4">24/7 Support</h1>
            <h1 className="text-sm md:text-base font-semibold">Fast support anytime</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
