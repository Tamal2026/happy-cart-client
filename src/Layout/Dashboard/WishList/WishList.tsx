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

  const handleWishList = async (product) => {
    try {
      const res = await axiosSecure.post('/wishlist', product);
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Item added to wishlist",
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "This item is already in your wishlist",
        });
      } else {
        console.error("Error adding item to wishlist:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to add item to wishlist",
        });
      }
    }
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
                <td>
                  <button
                    className="btn bg-blue-500 text-white"
                    onClick={() => handleWishList(wish)}
                  >
                    Add to Wishlist
                  </button>
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
