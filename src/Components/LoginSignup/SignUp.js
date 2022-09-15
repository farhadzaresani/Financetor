import React from "react";

export default function SignUp({
  setChange,
  setName,
  setUsername,
  setPassword,
  createAccount,
}) {
  return (
    <div className=" lgForm">
      <div className="signUp ">
        <div className="flex justify-between w-[100%]">
          <button onClick={() => setChange(1)} className="changelg">
            LogIn
          </button>
          <div className="mr-5">
            <h1 className="signupHead">Create an account!</h1>
          </div>
        </div>

        <label className="space-x-2">
          Name
          <input
            onChange={(e) => setName(e.target.value)}
            className=""
            type="text"
          />
        </label>
        <label className="space-x-2">
          UserName
          <input onChange={(e) => setUsername(e.target.value)} type="text" />
        </label>
        <label className="space-x-2">
          Password
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </label>
        <div className="">
          <button onClick={() => createAccount()} className="btn">
            SignUp
          </button>
        </div>
      </div>
    </div>
  );
}
