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
      <button onClick={() => setChange(1)} className="changelg">
        Do you Already have account?
      </button>
      <div className="signUp ">
        <div>
          <h1 className="signupHead">Create an account!</h1>
        </div>

        <label>
          Name
          <input
            onChange={(e) => setName(e.target.value)}
            className=""
            type="text"
          />
        </label>
        <label>
          UserName
          <input onChange={(e) => setUsername(e.target.value)} type="text" />
        </label>
        <label>
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
