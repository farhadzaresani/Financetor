import React from "react";
import hero from "../Assets/Images/hero.png";
import user from "../Assets/Images/user.png";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Home() {
  const cookie = new Cookies();
  const token = cookie.get("ut", { path: "/" });

  return (
    <div className="min-h-screen flex h-[100vh] flex-col  gap-11 justify-center items-center text-sefid p-[5vw] md:py-10  bg-meshki">
      <h1 className="text-l font-[fantasy] md:text-4xl my-4">
        Money is a terrible master but an excellent servant
      </h1>
      <div className="flex flex-col md:flex-row">
        <div className="w-[80%] md:w-[50%] m-auto ">
          <img src={`${hero}`} />
        </div>
        {token ? null : (
          <div className="w-[50%] flex flex-col m-auto   justify-around items-center">
            <Link
              className="w-[50%] md:w-[20%]  animate-pulse"
              to="/LoginSignup"
            >
              <img className=" " src={`${user}`} />
            </Link>
            <h1>Join us now</h1>
          </div>
        )}
      </div>
    </div>
  );
}
