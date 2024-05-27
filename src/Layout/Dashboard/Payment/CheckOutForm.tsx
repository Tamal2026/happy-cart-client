import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";

const CheckOutForm = () => {
  const [error, setError] = useState<string>("");
  const [clientSecret, setClientSecret] = useState<string | undefined>(
    undefined
  );

  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [cart] = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  useEffect(() => {
    axiosSecure.post("/create-payment-intent", {
        price: totalPrice,
      })
      .then((res) => {
        console.log("Response from backend",res.data);
        if (res.data.clientSecret) {
          setClientSecret(res.data.clientSecret);
        } else {
          setError("Failed to fetch client secret");
        }
      })
      .catch((error) => {
        console.error("Error fetching client secret:", error);
        setError("Failed to fetch client secret");
      });
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("[error from payment method]", error);
      setError(error.message);
    } else {
      console.log("Payment Method", paymentMethod);
      setError("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <p className="text-red-500 mt-2">{error}</p>
      {clientSecret === undefined ? (
       <span className="loading loading-bars loading-lg"></span>
      ) : (
        <button
          type="submit"
          className="btn bg-cyan-600 text-white mt-3 hover:bg-cyan-600 "
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
      )}
    </form>
  );
};

export default CheckOutForm;
