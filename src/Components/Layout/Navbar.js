import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Navbar() {
  const [isActive, setIsActive] = useState(0);
  const [logedin, setLogedin] = useState(false);
  const location = useLocation();
  const cookie = new Cookies();
  const isLogedin = cookie.get("ut", { path: "/" });

  useEffect(() => {
    isLogedin ? setLogedin(true) : setLogedin(false);
    if (location.pathname == "/") setIsActive(0);
    else if (location.pathname == "/ContactUs") setIsActive(1);
    else if (location.pathname == "/AboutUs") setIsActive(2);
    else if (location.pathname == "/LoginSignup") setIsActive(3);
  }, [location]);

  return (
    <div className=" navbar">
      <div className="flex gap-5">
        <Link className={`${isActive === 0 ? "text-abi" : ""} navItem`} to="/">
          Home
        </Link>
        <Link
          className={`${isActive === 1 ? "text-abi" : ""} navItem`}
          to="ContactUs"
        >
          Contact Us
        </Link>
        <Link
          className={`${isActive === 2 ? "text-abi" : ""} navItem`}
          to="AboutUs"
        >
          About Us
        </Link>
      </div>

      {logedin ? (
        <Link
          className={`${isActive === 3 ? "invisible" : ""} navItem`}
          to="Dashboard/MyProfile"
        >
          Profile
        </Link>
      ) : (
        <Link
          className={`${isActive === 3 ? "invisible" : ""} navItem`}
          to="LoginSignup"
        >
          LoginSignup
        </Link>
      )}
    </div>
  );
}
