import React, { useState } from "react";
import LogIn from "../Components/LoginSignup/LogIn";
import SignUp from "../Components/LoginSignup/SignUp";
import { useQuery, gql, useMutation } from "@apollo/client";
import Cookies from "universal-cookie";

const CREATE_ACCOUNT = gql`
  mutation Signup($name: String!, $username: String!, $password: String!) {
    signup(name: $name, username: $username, password: $password) {
      token
    }
  }
`;

const LOGIN_TOACCOUNT = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export default function LoginSignup() {
  const cookies = new Cookies();
  const [change, setChange] = useState(0);
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [logUsername, setLogUsername] = useState();
  const [logPassword, setlogPassword] = useState();
  const [create] = useMutation(CREATE_ACCOUNT);
  const [loginUser] = useMutation(LOGIN_TOACCOUNT);

  const createAccount = async () => {
    try {
      const {
        data: {
          signup: { token },
        },
      } = await create({
        variables: { name: name, username: username, password: password },
      });
      console.log(token);
      if (token)
        return (
          cookies.set("ut", token, { path: "/" }),
          window.location.assign(`http://localhost:3000/Dashboard/MyProfile`)
        );
      else console.log("somthing went wrong");
    } catch (error) {}
  };

  const loginAccount = async () => {
    try {
      const {
        data: {
          login: { token },
        },
      } = await loginUser({
        variables: { username: logUsername, password: logPassword },
      });
      console.log(token);
      if (token)
        return (
          cookies.set("ut", token, { path: "/" }),
          window.location.assign(`http://localhost:3000/Dashboard/MyProfile`)
        );
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div>
      {change === 0 ? (
        <SignUp
          setChange={setChange}
          setName={setName}
          setUsername={setUsername}
          setPassword={setPassword}
          createAccount={createAccount}
        />
      ) : (
        <LogIn
          setChange={setChange}
          setLogUsername={setLogUsername}
          setlogPassword={setlogPassword}
          loginAccount={loginAccount}
        />
      )}
    </div>
  );
}
