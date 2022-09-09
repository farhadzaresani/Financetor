import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";

function Sidebar() {
  const [open, setOpen] = useState(false);
  const [isActive, setIsActive] = useState();
  const cookie = new Cookies();
  const signOut = () => {
    cookie.remove("ut", { path: "/" });
  };
  const location = useLocation();

  useEffect(() => {
    if (location.pathname == "/Dashboard/MyProfile") setIsActive(0);
    else if (location.pathname == "/Dashboard/MyTags") setIsActive(1);
    else if (location.pathname == "/Dashboard/MyExpenses") setIsActive(2);
  }, [location]);

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
          open ? " " : "translate-x-20 "
        }  overflow-hidden transition-all`}
      >
        <div
          className=" bg-tosi pt-10 font-bold  text-sm  w-[5.5em] 
        flex flex-col items-center 
        justify-around h-full fixed  right-0"
        >
          <Link className={`sidebarItem`} to="/">
            Home
          </Link>
          <Link
            className={`${isActive === 0 ? "text-abi" : "sidebarItem"} `}
            to="/Dashboard/MyProfile"
          >
            {" "}
            Profile
          </Link>
          <Link
            className={`${isActive === 1 ? "text-abi " : "sidebarItem"} `}
            to="/Dashboard/MyTags"
          >
            Tags
          </Link>
          <Link
            className={`${isActive === 2 ? "text-abi " : "sidebarItem"} `}
            to="/Dashboard/MyExpenses"
          >
            Expenses
          </Link>
          <Link className="sidebarItem" onClick={() => signOut()} to="/">
            Sign Out
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
