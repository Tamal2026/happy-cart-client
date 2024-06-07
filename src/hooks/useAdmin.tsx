import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext, AuthContextType } from "../providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {


 const authContext = useContext(AuthContext) as AuthContextType;
const { user,loading } = authContext;
  const axiosSecure = useAxiosSecure();
  const { data : isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user?.email}`);
     
      return res.data?.admin
    },
  });
  return [isAdmin , isAdminLoading]
};

export default useAdmin;
