import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext,AuthContextType } from "../providers/AuthProvider";



const useCart = () => {
    const authContext = useContext(AuthContext) as AuthContextType;
    const { user } = authContext;

    const axiosSecure = useAxiosSecure();
const {refetch, data: cart=[]} = useQuery({
    queryKey: ['cart', user?.email],
    queryFn: async () =>{
        const res = await axiosSecure.get(`/cart?email=${user?.email}`)
        return res.data;
    }
})
  return [ cart,refetch]
};

export default useCart;
