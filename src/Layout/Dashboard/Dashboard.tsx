import React from "react";
import PersistentDrawerLeft from "./PersistentDrawerLeft";
import Cart from "./Cart";

const Dashboard: React.FC = () => {
  return (
    <>
      <PersistentDrawerLeft />

      <div className="max-w-screen-xl mx-auto ">
        <Cart></Cart>
      </div>
    </>
  );
};

export default Dashboard;
