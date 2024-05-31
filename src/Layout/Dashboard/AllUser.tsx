import { MdDeleteForever } from "react-icons/md";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaUsersGear } from "react-icons/fa6";
import Swal from "sweetalert2";

const AllUser = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `${user.name} will be an admin!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Make Admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "Successfully",
              text: `${user.name} is an admin now`,
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleDelete = (user) => {
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
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `${user.name} user has been deleted.`,
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="overflow-x-auto">
      <div className="overflow-x-auto">
        <table className="table  table-zebra-zebra">
          <thead>
            <tr>
              <th className="font-bold text-lg">Serial</th>
              <th className="font-bold text-lg">Name</th>
              <th className="font-bold text-lg">Email</th>
              <th className="font-bold text-lg">Role</th>
              <th className="font-bold text-lg">Remove</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    "Admin"
                  ) : (
                    <button
                      onClick={() => {
                        handleMakeAdmin(user);
                      }}
                      className="btn text-2xl bg-sky-600 text-white"
                    >
                      <FaUsersGear />
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className="btn bg-red-500 text-white"
                    disabled={user.role === 'admin'} onClick={() => handleDelete(user)}
                  >
                    
                    <MdDeleteForever className="text-2xl text-white"></MdDeleteForever>
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

export default AllUser;
