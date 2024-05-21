import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";

const Cart = () => {
  const [cart] = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-4 py-3 flex justify-between  border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Your Cart</h2>
          <h2 className="text-xl font-semibold text-gray-800">
            Total item : {cart.length}
          </h2>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <img
                src={cart.img}
                alt="Product"
                className="w-16 h-16 object-cover rounded-lg mr-4"
              />
              <div>
                <h3 className="font-semibold text-gray-800">Product Name</h3>
              </div>
            </div>
            <div className="flex items-center">
              <button className="text-gray-500 hover:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
              <span className="mx-2">1</span>
              <button className="text-gray-500 hover:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 12H4"
                  />
                </svg>
              </button>
              <button className="text-red-500 hover:text-red-700 ml-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* Cart total */}
          <div className="flex justify-between">
            <p className="text-lg font-semibold text-gray-800">Total:</p>
            <p className="text-lg font-semibold text-gray-800">
              ${totalPrice.toFixed(2)}
            </p>
          </div>
          {/* Checkout button */}
          <Link to="/checkout">
            
            <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
