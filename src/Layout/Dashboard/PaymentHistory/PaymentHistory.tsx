import { useContext } from "react";
import { AuthContext ,AuthContextType} from "../../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

interface FormData{
  _id:string;
  transationId:string;
  price:number;
}
const PaymentHistory = () => {
  const authContext = useContext(AuthContext) as AuthContextType;
  const { user } = authContext;
  const axiosSecure = useAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}`);
      return res.data;
    },
  });

  return (
    <div className="max-w-screen-md mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold mb-4">
        Total Payments: {payments.length}
      </h1>

      {payments.length === 0 ? (
        <p className="text-xl font-semibold text-sky-600 text-center">
          Sorry, you haven't made any purchases yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-3 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  No.
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Transaction Id
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments.map((payment:FormData, index:number) => (
                <tr key={payment._id}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    $ {payment.price}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {payment.transationId}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
