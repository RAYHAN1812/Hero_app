import React from "react";
import { Outlet } from "react-router-dom";

const Mainlayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
     
      <Outlet />
    </div>
  );
};

export default Mainlayout;
