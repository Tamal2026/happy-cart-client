import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold">Total Paymets: {payments.length}</h1>

      <div className="overflow-x-auto w-3/4">
        <table className="table table-zebra-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Price</th>
              <th>Transation Id</th>
         
            </tr>
          </thead>
          <tbody>
            {payments.map((payment , index) => (
              <tr key={payment._id}>
                <th>{index + 1}</th>
                <td>$ {payment.price}</td>
                <td>{payment.transationId}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
