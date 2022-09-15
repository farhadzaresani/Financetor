import React from "react";

export default function LogIn({
  setChange,
  setLogUsername,
  setlogPassword,
  loginAccount,
}) {
  return (
    <div className=" lgForm">
      <div className="signUp ">
        <div className="flex w-[100%]">
          <button onClick={() => setChange(0)} className="changelg">
            SignUp
          </button>
          <div className="m-auto pl-14">
            <h1 className="signupHead">LogIn to your account!</h1>
          </div>
        </div>

        <label>
          UserName
          <input onChange={(e) => setLogUsername(e.target.value)} type="text" />
        </label>
        <label>
          Password
          <input
            onChange={(e) => setlogPassword(e.target.value)}
            type="password"
          />
        </label>

        <div className="">
          <button onClick={() => loginAccount()} className="btn">
            LogIn
          </button>
        </div>
      </div>
    </div>
  );
}
