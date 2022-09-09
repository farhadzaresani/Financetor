import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
import Sidebar from "../Components/Layout/Sidebar";

export default function Dashboard() {
  const cookie = new Cookies();
  const token = cookie.get("ut");

  return (
    <div className="bg-meshki">
      <Sidebar />
      <Outlet />
    </div>
  );
}
