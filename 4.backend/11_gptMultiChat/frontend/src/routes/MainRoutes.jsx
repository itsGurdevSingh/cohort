import React from "react";
import { Route, Routes } from "react-router-dom";
import Home  from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import ProtectedLayout from "./ProtectedLayout.jsx";

const MainRoutes = () => {
  return <Routes>
    <Route path="/login" element={<Login />}/>
    <Route path="/register" element={<RegisterPage />}/>
    <Route element={<ProtectedLayout/>}>
    <Route path="/" element={<Home />}/>
    </Route>
  </Routes>;
};

export default MainRoutes;
