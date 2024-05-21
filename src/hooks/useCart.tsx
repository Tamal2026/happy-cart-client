import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";



const useCart = () => {
    const { user  } =useContext(AuthContext)

    const axiosSecure = useAxiosSecure();
const {refetch, data: cart=[]} = useQuery({
    queryKey: ['cart', user?.email],
    queryFn: async () =>{
        const res = await axiosSecure.get(`/cart?email=${user.email}`)
        return res.data;
    }
})
  return [ cart,refetch]
};

export default useCart;
