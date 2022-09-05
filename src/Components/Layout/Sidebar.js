import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

function Sidebar() {
  const [open, setOpen] = useState(false);
  const cookie = new Cookies();
  const signOut = () => {
    cookie.remove("ut", { path: "/" });
  };
  //   const openSidebar = () => {
  //     setOpen(!open);
  //   };

  return (
    <div className="text-sefid">
      <button
        className={`${
          open ? "rotate-90" : ""
        } fixed z-10 right-4 top-4 font-bold text-xl duration-500  transition-all`}
        onClick={() => setOpen(!open)}
      >
        |||
      </button>
      <div
        className={`${
          open ? "" : "translate-x-20 transition-all"
        } ease-out overflow-hidden`}
      >
        <div
          className=" bg-tosi text-sm  w-[5em] 
        flex flex-col items-center 
        justify-around h-full fixed  right-0"
        >
          {/* <button onClick={() => openSidebar()}>X</button> */}
          <Link to="/">Home</Link>
          <Link to="/Dashboard/MyProfile"> Profile</Link>
          <Link to="/Dashboard/MyTags">Tags</Link>
          <Link to="/Dashboard/MyExpenses">Expenses</Link>
          <Link onClick={() => signOut()} to="/">
            Sign Out
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
