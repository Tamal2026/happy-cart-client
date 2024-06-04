import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";

const WishList = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data: wishData = [], refetch } = useQuery({
    queryKey: ["wishData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist/?email=${user.email}`);
      return res.data;
    },
  });

  const handleDelete = (productId, productName) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/wishlist/${productId}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `${productName} has been deleted.`,
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="max-w-screen-md mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      <p className="text-2xl font-bold mb-4">Total WishList: {wishData.length}</p>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-sm font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
              <th className="px-2 sm:px-4 py-3">No.</th>
              <th className="px-2 sm:px-4 py-3">Name</th>
              <th className="px-2 sm:px-4 py-3">Price</th>
              <th className="px-2 sm:px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {wishData.map((wish, index) => (
              <tr key={wish._id}>
                <td className="px-2 sm:px-4 py-3 whitespace-nowrap">{index + 1}</td>
                <td className="px-2 sm:px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-10 h-10 sm:w-12 sm:h-12">
                        <img src={wish.img} alt="Product Image" />
                      </div>
                    </div>
                    <div className="font-semibold">{wish.name}</div>
                  </div>
                </td>
                <td className="px-2 sm:px-4 py-3 whitespace-nowrap font-semibold">${wish.price}</td>
                <td
                  className="px-2 sm:px-4 py-3 whitespace-nowrap text-red-500 cursor-pointer"
                  onClick={() => handleDelete(wish._id, wish.name)}
                >
                  Remove
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WishList;
