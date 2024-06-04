import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Cart = () => {
  const axiosSecure = useAxiosSecure();
  const [cart, refetchCart] = useCart();
  const [quantities, setQuantities] = useState([]);

  useEffect(() => {
    setQuantities(cart.map((item) => item.quantity || 1));
  }, [cart]);

  const totalPrice = cart.reduce(
    (total, item, index) => total + item.price * quantities[index],
    0
  );

  const handleIncrease = (index) => {
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] += 1;
      return newQuantities;
    });
  };

  const handleDecrease = (index) => {
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      if (newQuantities[index] > 1) {
        newQuantities[index] -= 1;
      }
      return newQuantities;
    });
  };

  const handleDelete = (id) => {
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
            refetchCart();
          }
        });
      }
    });
  };

  return (
    <div className="max-w-screen-xl mx-auto mb-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-4 py-3 flex flex-col sm:flex-row justify-between border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 sm:mb-0">Your Cart</h2>
          <h2 className="text-xl font-semibold text-gray-800">Total items: {cart.length}</h2>
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
                className="flex flex-col sm:flex-row items-center justify-between py-3 border-b border-gray-200"
              >
                <div className="flex items-center gap-3 mb-2 sm:mb-0">
                  <div className="font-bold text-lg">{index + 1}.</div>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={item.img} alt={item.name} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{item.name}</div>
                    <div className="text-sm opacity-50">{item.short_desc}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    className="rounded-xl bg-red-500 btn-sm text-center font-bold  text-white text-xl"
                    onClick={() => handleDecrease(index)}
                  >
                    -
                  </button>
                  <div className="text-xl font-semibold">{quantities[index]}</div>
                  <button
                    className="rounded-xl bg-blue-500 btn-sm text-center font-bold  text-white text-xl"
                    onClick={() => handleIncrease(index)}
                  >
                    +
                  </button>
                </div>
                <div className="text-right mt-2 sm:mt-0">
                  <div className="font-bold text-lg">${(item.price * quantities[index]).toFixed(2)}</div>
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
        <div className="px-4 py-3 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center">
          {cart.length ? (
            <Link to="/dashboard/payment">
              <button className="btn bg-sky-600 text-white text-xl mb-2 sm:mb-0 w-full sm:w-auto">Pay</button>
            </Link>
          ) : (
            <button disabled className="btn bg-sky-600 text-white text-xl mb-2 sm:mb-0 w-full sm:w-auto">Pay</button>
          )}
          <div className="text-lg font-semibold mb-2 sm:mb-0">Total Price: ${totalPrice.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
