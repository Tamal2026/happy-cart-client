import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {  useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import { AuthContext,AuthContextType } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Modal from "react-modal";

// Define the type for an item in the cart
interface CartItem {
  _id: string;
  itemId: string;
  price: number;
  quantity: number;
}

const customStyles= {
  content: {
    top: "50%",
    left: "50%",
    bottom: "25%",
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
    textAlign: "center" as const, // Ensure textAlign matches TextAlign | undefined
    transition: "transform 1s ease-in-out",
  },
};


Modal.setAppElement("#root");

const CheckOutForm = () => {
  const authContext = useContext(AuthContext) as AuthContextType;
  const { user } = authContext;
  const [error, setError] = useState<string>("");
  const [clientSecret, setClientSecret] = useState<string | undefined>(
    undefined
  );
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [cart, refetch] = useCart(); // Specify the type for the cart items
  const totalPrice = cart.reduce(
    (total:number, item: CartItem) => total + item.price * item.quantity
    ,
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
    } else {
      // If totalPrice is not greater than 0, reset the client secret
      setClientSecret(undefined);
    }
  }, [axiosSecure, totalPrice]);
  
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!stripe || !elements) {
      return;
    }
  
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
  
    if (clientSecret === undefined) {
      // Handle the case where clientSecret is undefined
      setError("Client secret is not defined");
      return;
    }
  
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
  
    if (error) {
      console.log("[error from payment method]", error);
     
      return;
    }
  
    console.log("Payment Method", paymentMethod);
    setError("");
  
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || "anonymous",
          name: user?.displayName || "anonymous",
        },
      },
    });
  
    if (confirmError) {
      console.log("Confirm error", confirmError);
    } else {
      console.log("payment intent", paymentIntent);
  
      const payment = {
        email: user?.email,
        name: user?.displayName,
        price: totalPrice,
        transationId: paymentIntent.id,
        date: new Date(), // Utc date convert using moment.js // TODo
        cartIds: cart.map((item: CartItem) => item._id),
        productItemIds: cart.map((item: CartItem) => item.itemId),
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
      <div className=" mb-10">
       
      </div>
      <form onSubmit={handleSubmit}>
    <h1 className="mb-5">Use Stripe test card for testing (ex: 4242424242424242 is card number) any future date for MM/YY and any 5 digit for CVC</h1>
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
            value: {
              postalCode: "12345", // Example postal code
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
          <h2 className="font-bold text-xl mb-4">
            Thank You for shopping with us
          </h2>
          <div className="flex justify-center space-x-4">
            <Link to="/dashboard/addreview">
              <button className="btn bg-green-500 text-white font-bold text-xl">
                Add a Review
              </button>
            </Link>
            <Link to="/">
              <button className="btn bg-red-500 text-white font-bold text-xl">
                Back to home
              </button>
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CheckOutForm;
