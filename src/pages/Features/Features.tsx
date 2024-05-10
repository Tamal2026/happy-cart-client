import { BiSupport, BiTransfer } from "react-icons/bi";
import { FaShippingFast } from "react-icons/fa";
import { MdOutlineSecurityUpdateGood } from "react-icons/md";

const Features = () => {
  return (
    <div className="flex justify-between max-w-screen-2xl my-3 mx-auto">
      <div className="flex flex-col items-center">
        <div className="h-[220px] rounded-md text-7xl flex flex-col justify-center items-center text-white w-[350px] bg-slate-400">
          <FaShippingFast />
          <h2 className="text-xl font-bold mt-4">Free Shipping</h2>
          <h2 className="text-lg font-semibold">Free on orders over $300</h2>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="h-[220px] rounded-md text-7xl flex flex-col justify-center items-center text-white w-[350px] bg-slate-400">
          <MdOutlineSecurityUpdateGood />
          <h1 className="text-xl font-bold mt-4">Security Payment</h1>
          <h1 className="text-lg font-semibold">100% secure payment</h1>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="h-[220px] rounded-md text-7xl flex flex-col justify-center items-center text-white w-[350px] bg-slate-400">
          <BiTransfer />
          <h1 className="text-xl font-bold mt-4">30 Day Return</h1>
          <h1 className="text-lg font-semibold">30-day money-back guarantee</h1>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="h-[220px] rounded-md text-7xl flex flex-col justify-center items-center text-white w-[350px] bg-slate-400">
          <BiSupport />
          <h1 className="text-xl font-bold mt-4">24/7 Support</h1>
          <h1 className="text-lg font-semibold">Fast support anytime</h1>
        </div>
      </div>
    </div>
  );
};

export default Features;
