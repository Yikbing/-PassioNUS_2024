import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import EmailVerify from "./components/EmailVerify";
import CreateProfile from "./components/CreateProfile";
import InterestsForm from "./components/Interests";

function App() {
  const user = localStorage.getItem("token");

  return (
    <Routes>
      {!user && (
        <>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
		  <Route path="/students/:id/verify/:token" element={<EmailVerify />} />
        </>
      )}
      {user && (
        <Route path="/" element={<Layout />}>
          <Route index path="/main" element={<Main />} />
		      <Route path="/create_profile" element={<CreateProfile />} />
		      <Route path="/interests" element={<InterestsForm />} />
          <Route path="/matching" element={<Main />} />
          <Route path="/study" element={<Main />} />
          <Route path="/events" element={<InterestsForm />} />
          <Route path="/game" element={<Main />} />
          <Route path="/settings" element={<Main />} />
        </Route>
      )}
    </Routes>
  );
}

export default App;
