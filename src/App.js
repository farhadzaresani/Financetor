import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import LoginSignup from "./Pages/LoginSignup";
import WebLayout from "./Pages/WebLayout";
import MyProfile from "./Pages/MyProfile";
import MyTags from "./Pages/MyTags";
import MyExpenses from "./Pages/MyExpenses";
import ContactUs from "./Pages/ContactUs";
import AboutUs from "./Pages/AboutUs";
import { useQuery, gql, useMutation } from "@apollo/client";

function App() {
  useEffect(() => {}, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WebLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="ContactUs" element={<ContactUs />} />
          <Route path="AboutUs" element={<AboutUs />} />
          <Route path="LoginSignup" element={<LoginSignup />} />
        </Route>
        <Route path="/Dashboard/" element={<Dashboard />}>
          <Route path="MyProfile" element={<MyProfile />} />
          <Route path="MyTags" element={<MyTags />} />
          <Route path="MyExpenses" element={<MyExpenses />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
