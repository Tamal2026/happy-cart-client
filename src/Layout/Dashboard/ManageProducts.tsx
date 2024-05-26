import { useQuery } from "@tanstack/react-query";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageProducts = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const {
    data: products = [],
    refetch,
    isPending: loading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await axiosPublic.get("/all-products");
        return res.data;
      } catch (error) {
        throw new Error("Failed to fetch products");
      }
    },
  });

  const handleDelete = (product) => {
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
        axiosSecure.delete(`/all-products/${product._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: `${product.name} has been Deleted`,
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <div>
      {loading ? (
        <p>
          Please wait...  <span className="loading loading-bars loading-md"></span>
        </p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Update</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product._id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={product.img}
                        alt={product.name}
                        className="w-12 h-12"
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.price}</td>
                    <td>
                    <Link to={`/dashboard/updatedProduct/${product._id}`}>  <button className="rounded-lg bg-sky-600 btn-sm text-white hover:-translate-y-1 transition-transform ease-in">
                        <FaEdit />
                      </button></Link>
                    </td>

                    <td>
                      <button
                        onClick={() => {
                          handleDelete(product);
                        }}
                        className="rounded-lg text-xl bg-red-600 p-2 text-white hover:-translate-y-1 transition-transform ease-out"
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ManageProducts;
