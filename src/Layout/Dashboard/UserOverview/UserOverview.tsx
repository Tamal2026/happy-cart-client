import { useContext } from "react";
import { AuthContext,AuthContextType } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

interface Order{
  price:number;
}

const UserOverview = () => {

  const authContext = useContext(AuthContext) as AuthContextType;
  const { user } = authContext;
  
  const axiosSecure = useAxiosSecure();

  const { data: userData = [], } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userOverview/?email=${user?.email}`);
      return res.data;
    },
  });

  // Calculate total price spent on all orders
  const totalPrice = userData.reduce((total: number, order: Order) => total + order.price, 0);


  return (
    <div className="max-w-screen-md mx-auto mb-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start">
        <div className="text-xl mt-4">
          <span className="text-gray-600">Hi, Welcome</span>
          <h1 className="font-bold text-2xl">
            {user?.displayName ? user.displayName : "Back"}
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row justify-center mt-4">
          <div className="order-box bg-green-500 text-white p-4 rounded-lg mb-4 sm:mb-0 sm:mr-4">
            <p className="font-bold text-xl">Total Orders</p>
            <p className="font-bold text-3xl">{userData.length}</p>
          </div>
          <div className="order-box bg-blue-500 text-white p-4 rounded-lg">
            <p className="font-bold text-xl">Total Spent </p>
            <p className="font-bold text-3xl">${totalPrice.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOverview;
