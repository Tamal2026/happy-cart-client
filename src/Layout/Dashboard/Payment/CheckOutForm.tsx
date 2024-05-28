import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckOutForm = () => {
  const [error, setError] = useState<string>("");
  const [clientSecret, setClientSecret] = useState<string | undefined>(
    undefined
  );
  const [transationId, setTransationId] = useState("");

  const stripe = useStripe();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [cart, refetch] = useCart();
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", {
          price: totalPrice,
        })
        .then((res) => {
          if (res.data.clientSecret || res.data.paymentResult.insertedId) {
            setClientSecret(res.data.clientSecret);
          } else {
            setError("Failed to fetch client secret");
          }
        })
        .catch((error) => {
          console.error("Error fetching client secret:", error);
          setError("Failed to fetch client secret");
        });
    }
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

    const { paymentIntent, error: ConfirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (ConfirmError) {
      console.log("Confirm error");
    } else {
      console.log("payment intent", paymentIntent);

      const payment = {
        email: user.email,
        price: totalPrice,
        transationId: paymentIntent.id,
        date: new Date(), // Utc date convert using moment.js // TODo
        cartIds: cart.map((item) => item._id),
        productItemIds: cart.map((item) => item.itemId),
        status: "pending",
      };
      const res = await axiosSecure.post("/payments", payment);
      refetch();
      if (res.data?.paymentResult?.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Hooray! Your order is on its way!",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/");
      }
    }
  };

  return (
    <>
      <div>
        <p>Total amount: </p>
      </div>
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
        {transationId && (
          <p className="text-green-500">Your transationId {transationId}</p>
        )}
      </form>
    </>
  );
};

export default CheckOutForm;
