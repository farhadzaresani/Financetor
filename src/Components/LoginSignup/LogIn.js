import React from "react";

export default function LogIn({
  setChange,
  setLogUsername,
  setlogPassword,
  loginAccount,
}) {
  return (
    <div className=" lgForm">
      <button onClick={() => setChange(0)} className="changelg">
        Do you want to Create an account?
      </button>
      <div className="signUp ">
        <div>
          <h1 className="signupHead">LogIn to your account!</h1>
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
