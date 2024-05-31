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
              text: `${productName}  has been deleted.`,
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <p className="text-2xl font-bold">Total WishList: {wishData.length}</p>

      <div className="overflow-x-auto">
        <table className="table text-xl">
          <thead>
            <tr className="text-xl font-semi-bold">
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {wishData.map((wish, index) => (
              <tr key={wish._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={wish.img}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-semi-bold">{wish.name}</div>
                    </div>
                  </div>
                </td>
                <td className="font-semibold">{wish.price}</td>
                <td
                  className="btn bg-red-500 text-white"
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
