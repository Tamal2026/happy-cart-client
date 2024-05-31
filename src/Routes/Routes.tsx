import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Contact from "../pages/Contact/Contact";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Dashboard from "../Layout/Dashboard/Dashboard";
import PurchasedHistory from "../Layout/Dashboard/PurchasedHistory";
import Cart from "../Layout/Dashboard/Cart";
import Checkout from "../pages/Checkout/Checkout";
import AllUser from "../Layout/Dashboard/AllUser";
import AddProduct from "../Layout/Dashboard/AddProduct";
import AdminRoutes from "./AdminRoutes";
import ManageProducts from "../Layout/Dashboard/ManageProducts";
import UpdatedProduct from "../Layout/Dashboard/UpdatedProduct";
import Payment from "../Layout/Dashboard/Payment/Payment";
import PaymentHistory from "../Layout/Dashboard/PaymentHistory/PaymentHistory";
import UserOverview from "../Layout/Dashboard/UserOverview/UserOverview";
import AdminOverview from "../Layout/Dashboard/AdminOverview/AdminOverview";
import AddReview from "../Layout/Dashboard/AddReview/AddReview";
import AllProducts from "../pages/Home/AllProducts/AllProducts";
import WishList from "../Layout/Dashboard/WishList/WishList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/contact",
        element: (
          <PrivateRoute>
            <Contact></Contact>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
      {
        path: "/products:category",
        element: <AllProducts></AllProducts>,
      },
      {
        path: "/cart",
        element: <Cart></Cart>,
      },

      {
        path: "/checkout",
        element: <Checkout></Checkout>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "purchasedHistory",

        element: <PurchasedHistory></PurchasedHistory>,
      },
      {
        path: "payment",
        element: <Payment></Payment>,
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "userOverview",
        element: <UserOverview></UserOverview>,
      },
      {
        path: "addreview",
        element: <AddReview></AddReview>,
      },
      {
        path: "wishlist",
        element: <WishList></WishList>,
      },
      // Admin ROutes
      {
        path: "addProduct",
        element: (
          <AdminRoutes>
            <AddProduct></AddProduct>
          </AdminRoutes>
        ),
      },
      {
        path: "allusers",
        element: (
          <AdminRoutes>
            <AllUser></AllUser>
          </AdminRoutes>
        ),
      },
      {
        path: "manageProducts",
        element: (
          <AdminRoutes>
            <ManageProducts></ManageProducts>
          </AdminRoutes>
        ),
      },
      {
        path: "adminOverview",
        element: (
          <AdminRoutes>
            <AdminOverview></AdminOverview>
          </AdminRoutes>
        ),
      },
      {
        path: "updatedProduct/:id",
        element: (
          <AdminRoutes>
            <UpdatedProduct></UpdatedProduct>
          </AdminRoutes>
        ),
        loader: ({ params }) => {
          const fetchData = async () => {
            try {
              const res = await fetch(
                `http://localhost:5000/all-products/${params.id}`
              );
              if (res.ok) {
                const data = await res.json();
                return data;
              }
            } catch (error) {
              console.error(
                "Error Fetching data for update product client",
                error
              );
              return null;
            }
          };
          return fetchData();
        },
      },
    ],
  },
]);
