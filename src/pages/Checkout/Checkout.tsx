import React from 'react';

const Checkout = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Billing Details */}
        <div className="md:col-span-2 lg:col-span-1">
          <h3 className="text-xl font-semibold mb-2">Billing Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="w-full border border-gray-300 rounded p-2"
              placeholder="John Doe"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded p-2"
              placeholder="john@example.com"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              className="w-full border border-gray-300 rounded p-2"
              placeholder="123 Main St"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              className="w-full border border-gray-300 rounded p-2"
              placeholder="New York"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                className="w-full border border-gray-300 rounded p-2"
                placeholder="NY"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="zip">Zip Code</label>
              <input
                type="text"
                id="zip"
                className="w-full border border-gray-300 rounded p-2"
                placeholder="10001"
              />
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="md:col-span-2 lg:col-span-1">
          <h3 className="text-xl font-semibold mb-2">Payment Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="cardName">Name on Card</label>
            <input
              type="text"
              id="cardName"
              className="w-full border border-gray-300 rounded p-2"
              placeholder="John Doe"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              className="w-full border border-gray-300 rounded p-2"
              placeholder="1234 5678 9012 3456"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="expiry">Expiry Date</label>
              <input
                type="text"
                id="expiry"
                className="w-full border border-gray-300 rounded p-2"
                placeholder="MM/YY"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="cvc">CVC</label>
              <input
                type="text"
                id="cvc"
                className="w-full border border-gray-300 rounded p-2"
                placeholder="123"
              />
            </div>
          </div>
        </div>
      </form>
      <div className="mt-4">
        <button className="w-full md:w-auto bg-blue-500 text-white py-2 px-4 rounded">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
