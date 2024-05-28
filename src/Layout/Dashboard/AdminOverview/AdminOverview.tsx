import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { FaShop, FaTruckArrowRight, FaUsers } from "react-icons/fa6";

const AdminOverview = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("admin-stats");
        return res.data;
      } catch (error) {
        console.error("Error fetching admin stats:", error);
        return {};
      }
    },
  });

  return (
    <div className="flex flex-wrap justify-center">
      {/* Total Revenue */}
      <div className="w-24 h-24 md:w-36 md:h-36 lg:w-48 lg:h-48 bg-red-700 m-4 rounded-lg flex flex-col justify-center items-center hover:bg-red-800 transition-colors duration-300 ease-in-out">
        <FaMoneyCheckAlt className="text-white text-3xl" />
        <div className="text-center mt-2 font-semibold text-white text-xs md:text-sm lg:text-lg">
          Revenue: ${stats.revenue}
        </div>
      </div>

      {/* Total Users */}
      <div className="w-24 h-24 md:w-36 md:h-36 lg:w-48 lg:h-48 bg-blue-700 m-4 rounded-lg flex flex-col justify-center items-center hover:bg-blue-800 transition-colors duration-300 ease-in-out">
        <FaUsers className="text-white text-3xl" />
        <div className="text-center mt-2 font-semibold text-white text-xs md:text-sm lg:text-lg">
          Total Users: {stats.users}
        </div>
      </div>

      {/* Total Orders */}
      <div className="w-24 h-24 md:w-36 md:h-36 lg:w-48 lg:h-48 bg-green-600 m-4 rounded-lg flex flex-col justify-center items-center hover:bg-green-700 transition-colors duration-300 ease-in-out">
        <FaTruckArrowRight className="text-white text-3xl" />
        <div className="text-center mt-2 font-semibold text-white text-xs md:text-sm lg:text-lg">
          Total Orders: {stats.totalOrders}
        </div>
      </div>

      {/* Total Products */}
      <div className="w-24 h-24 md:w-36 md:h-36 lg:w-48 lg:h-48 bg-yellow-500 m-4 rounded-lg flex flex-col justify-center items-center hover:bg-yellow-600 transition-colors duration-300 ease-in-out">
        <FaShop className="text-white text-3xl" />
        <div className="text-center mt-2 font-semibold text-white text-xs md:text-sm lg:text-lg">
          Total Products: {stats.totalProducts}
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
