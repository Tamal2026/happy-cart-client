import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const UserOverview = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: userData = [], isLoading: isUserData } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userOverview/?email=${user.email}`);
      return res.data;
    },
  });
 
  return (
    <div>
      <div>
        <h1 className="text-xl">
          <span>Hi, Welcome</span>
          <h1 className="font-bold text-2xl">
            {" "}
            {user?.displayName ? user.displayName : "Back"}
          </h1>
          <p>Total Orders: {userData.length}</p>
        </h1>
      </div>
    </div>
  );
};

export default UserOverview;
