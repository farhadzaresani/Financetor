import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import {
  Home,
  Profile,
  Tag2,
  Money,
  Logout,
  HambergerMenu,
} from "iconsax-react";

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
      {/* <HambergerMenu
        size="32"
        color="white"
        variant="Bulk"
        className={`${
          open ? "rotate-90" : ""
        } fixed z-20 right-5 top-5 duration-500 cursor-pointer transition-all`}
        onClick={() => setOpen(!open)}
      /> */}

      <div
        onClick={() => setOpen(!open)}
        className={`${
          open ? "bg-abitire" : ""
        } p-1 bg-[#919191de] rounded-md space-y-1 flex flex-col 
        justify-center items-center  h-7 w-7
      fixed z-20 right-6 top-5 duration-500 cursor-pointer transition-all`}
      >
        <div
          className={`${
            open ? "rotate-45 ml-2 absolute  top-[.75em] right-[.15em]  " : ""
          }
        h-[3px] w-[23px] rounded-lg bg-sefid transition-all duration-700`}
        ></div>
        <div
          className={`${
            open
              ? "rotate-[135deg] ml-2 absolute  top-[.5em] right-[.15em]   "
              : ""
          }
        h-[3px] w-[23px] rounded-lg bg-sefid transition-all duration-700`}
        ></div>
        <div
          className={`${
            open ? "rotate-[-45deg] absolute top-[.5em] right-[.15em] " : ""
          }
        h-[3px] w-[23px] rounded-lg bg-sefid transition-all duration-700`}
        ></div>
      </div>
      <div className={` overflow-hidden transition-all`}>
        <div
          className={`${
            open ? " " : "translate-x-20"
          }  bg-tosi pt-10 font-bold z-10 text-sm  w-[5.5em] 
        flex flex-col items-center 
        justify-around h-full fixed transition-all duration-300 border-l-[2px] border-abi right-0`}
        >
          <Link className={`sidebarItem`} to="/">
            <Home size="32" color="white" variant="Bulk" />
          </Link>
          <Link
            className={`${isActive === 0 ? "text-abi" : "sidebarItem"} `}
            to="/Dashboard/MyProfile"
          >
            <Profile size="32" color="white" variant="Bulk" />
          </Link>
          <Link
            className={`${isActive === 1 ? "text-abi " : "sidebarItem"} `}
            to="/Dashboard/MyTags"
          >
            <Tag2 size="32" color="white" variant="Bulk" />
          </Link>
          <Link
            className={`${isActive === 2 ? "text-abi " : "sidebarItem"} `}
            to="/Dashboard/MyExpenses"
          >
            <Money size="32" color="white" variant="Bulk" />
          </Link>
          <Link className="sidebarItem" onClick={() => signOut()} to="/">
            <Logout size="32" color="white" variant="Bulk" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
