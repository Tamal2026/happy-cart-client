import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { FaShop, FaTruckArrowRight, FaUsers } from "react-icons/fa6";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
import './admin.css'

const AdminOverview = () => {
  const axiosSecure = useAxiosSecure();

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
  const { data: chartData = [] } = useQuery({
    queryKey: ["order-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/order-stats");
      return res.data;
    },
  });

  // Custom shape for the bar chart
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
  Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  return (
    <>
      <div className="flex flex-wrap justify-center">
        <div className="w-36 h-36 bg-red-700 m-4 rounded-lg flex flex-col justify-center items-center hover:bg-red-800 transition-colors duration-300 ease-in-out">
          <FaMoneyCheckAlt className="text-white text-3xl" />
          <div className="text-center mt-2 font-semibold text-white text-sm">
            Revenue: ${stats.revenue}
          </div>
        </div>

        <div className="w-36 h-36 bg-blue-700 m-4 rounded-lg flex flex-col justify-center items-center hover:bg-blue-800 transition-colors duration-300 ease-in-out">
          <FaUsers className="text-white text-3xl" />
          <div className="text-center mt-2 font-semibold text-white text-sm">
            Total Users: {stats.users}
          </div>
        </div>

        <div className="w-36 h-36 bg-green-600 m-4 rounded-lg flex flex-col justify-center items-center hover:bg-green-700 transition-colors duration-300 ease-in-out">
          <FaTruckArrowRight className="text-white text-3xl" />
          <div className="text-center mt-2 font-semibold text-white text-sm">
            Total Orders: {parseFloat(stats.totalOrders).toFixed(2)}
          </div>
        </div>

        <div className="w-36 h-36 bg-yellow-500 m-4 rounded-lg flex flex-col justify-center items-center hover:bg-yellow-600 transition-colors duration-300 ease-in-out">
          <FaShop className="text-white text-3xl" />
          <div className="text-center mt-2 font-semibold text-white text-sm">
            Total Products: {stats.totalProducts}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="chart-container w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis className="sm:w-1/3" />
            <Bar
              dataKey="quantity"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {chartData.map((data, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </div>
      </div>
    </>
  );
};

export default AdminOverview;
