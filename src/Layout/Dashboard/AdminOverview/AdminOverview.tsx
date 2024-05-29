import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { FaShop, FaTruckArrowRight, FaUsers } from "react-icons/fa6";
import {
  BarChart,
  PieChart,
  Pie,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
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

  // custom shape for the bar chart

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
  // 

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  // Custom shape for the pie chart

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
const pieChartData = chartData.map(data =>{
  console.log(data)
  return {
    name:data.category,
    value:data.revenue
  }
})
  return (
    <>
      <div className="flex flex-wrap justify-center">
        <div className="w-24 h-24 md:w-36 md:h-36 lg:w-48 lg:h-48 bg-red-700 m-4 rounded-lg flex flex-col justify-center items-center hover:bg-red-800 transition-colors duration-300 ease-in-out">
          <FaMoneyCheckAlt className="text-white text-3xl" />
          <div className="text-center mt-2 font-semibold text-white text-xs md:text-sm lg:text-lg">
            Revenue: ${stats.revenue}
          </div>
        </div>

        <div className="w-24 h-24 md:w-36 md:h-36 lg:w-48 lg:h-48 bg-blue-700 m-4 rounded-lg flex flex-col justify-center items-center hover:bg-blue-800 transition-colors duration-300 ease-in-out">
          <FaUsers className="text-white text-3xl" />
          <div className="text-center mt-2 font-semibold text-white text-xs md:text-sm lg:text-lg">
            Total Users: {stats.users}
          </div>
        </div>

        <div className="w-24 h-24 md:w-36 md:h-36 lg:w-48 lg:h-48 bg-green-600 m-4 rounded-lg flex flex-col justify-center items-center hover:bg-green-700 transition-colors duration-300 ease-in-out">
          <FaTruckArrowRight className="text-white text-3xl" />
          <div className="text-center mt-2 font-semibold text-white text-xs md:text-sm lg:text-lg">
            Total Orders: {stats.totalOrders}
          </div>
        </div>

        <div className="w-24 h-24 md:w-36 md:h-36 lg:w-48 lg:h-48 bg-yellow-500 m-4 rounded-lg flex flex-col justify-center items-center hover:bg-yellow-600 transition-colors duration-300 ease-in-out">
          <FaShop className="text-white text-3xl" />
          <div className="text-center mt-2 font-semibold text-white text-xs md:text-sm lg:text-lg">
            Total Products: {stats.totalProducts}
          </div>
        </div>
      </div>
      <div className="flex w-1/2">
        <div>
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
            <YAxis />
            <Bar
              dataKey="quantity"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {chartData.map((index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
              ))}
            </Bar>
          </BarChart>
        </div>
        <div>
          <PieChart width={400} height={400}>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieChartData.map(( index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>
    </>
  );
};

export default AdminOverview;
