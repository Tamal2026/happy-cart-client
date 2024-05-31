import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    bottom:"30%",
    transform: "translate(-50%, -50%)",
    borderRadius: "0.5rem",
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.2), 0 6px 32px rgba(0, 0, 0, 0.1)",
    border: "none",
    padding: "2rem",
    maxWidth: "30rem",
    width: "90%",
    backgroundColor: "#FFFFFF",
    fontFamily: "Arial, sans-serif",
    color: "#333333",
    fontSize: "1rem",
    lineHeight: "1.5",
    textAlign: "center",
    transition: "transform 1s ease-in-out",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: "1000",
  },
};

Modal.setAppElement("#root");

const CheckOutForm = () => {
  const [error, setError] = useState<string>("");
  const [clientSecret, setClientSecret] = useState<string | undefined>(
    undefined
  );
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const stripe = useStripe();

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
        name: user.displayName,
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
        }).then(() => {
          setReviewModalOpen(true);
        });
      }
    }
  };

  const handleCloseReviewModal = () => {
    setReviewModalOpen(false);
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
      </form>

      <Modal
        isOpen={reviewModalOpen}
        onRequestClose={handleCloseReviewModal}
        style={customStyles}
        closeTimeoutMS={1000} 
        shouldCloseOnOverlayClick={false} 
      >
        <div className="p-4">
          <h2 className="font-bold text-xl mb-4">Thank You for shopping with us</h2>
          <div className="flex justify-center space-x-4">
            <Link to="/dashboard/addreview">
              <button className="btn bg-green-500 text-white font-bold text-xl">Add a Review</button>
            </Link>
            <Link to="/">
              <button className="btn bg-red-500 text-white font-bold text-xl">Back to home</button>
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CheckOutForm;
