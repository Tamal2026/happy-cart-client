import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Cart = () => {
  const axiosSecure = useAxiosSecure();
  const [cart, refetch] = useCart();
  const [quantities, setQuantities] = useState([]);

  // Initialize quantities state when the cart changes
  useEffect(() => {
    setQuantities(cart.map(() => 1));
  }, [cart]);

  const totalPrice = cart.reduce(
    (total, item, index) => total + item.price * quantities[index],
    0
  );

  const handleIncrease = (index) => {
    setQuantities((prev) => {
      const newQuantities = [...prev];
      newQuantities[index] += 1;
      return newQuantities;
    });
  };

  const handleDecrease = (index) => {
    setQuantities((prev) => {
      const newQuantities = [...prev];
      if (newQuantities[index] > 0) {
        newQuantities[index] -= 1;
      }
      return newQuantities;
    });
  };

  const handleDelete = (id: number) => {
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
        axiosSecure.delete(`/cart/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-4 py-3 flex justify-between border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Your Cart</h2>
          <h2 className="text-xl font-semibold text-gray-800">
            Total items: {cart.length}
          </h2>
        </div>
        <div className="px-4 py-3">
          {cart.length === 0 ? (
            <div className="text-center text-xl py-4 text-gray-600">
              Your cart is empty.
            </div>
          ) : (
            cart.map((item, index) => (
              <div
                key={item._id}
                className="flex items-center justify-between py-3 border-b border-gray-200"
              >
                <div className="flex items-center gap-3">
                  <div className="font-bold text-lg">{index + 1}.</div>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={item.img} alt={item.name} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{item.name}</div>
                    <div className="text-sm opacity-50">{item.description}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => handleDecrease(index)}
                  >
                    -
                  </button>
                  <div className="text-lg font-semibold">
                    {quantities[index]}
                  </div>
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => handleIncrease(index)}
                  >
                    +
                  </button>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">
                    ${(item.price * quantities[index]).toFixed(2)}
                  </div>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-ghost btn-xs"
                  >
                    Remove <FaTrashAlt className="text-red-600"></FaTrashAlt>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="px-4 py-3 border-t border-gray-200 flex justify-between">
          {cart.length ? (
            <Link to="/dashboard/payment"> <button  className="btn bg-sky-600 text-white text-xl">Pay</button></Link>
          ) : (
            <button disabled className="btn bg-sky-600 text-white text-xl">Pay</button>
          )}
          <div className="text-lg font-semibold">
            Total Price: ${totalPrice.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
