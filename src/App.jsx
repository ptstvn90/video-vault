import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';



import Home from "./pgs/Home/Home";
import Player from "./pgs/Player/Player";
import Login from "./pgs/Login/Login";

const App = () => {
  const isAuthenticated = localStorage.getItem("token");

  return (
    <div className="app">
      <ToastContainer theme="dark" />
      <Routes>
      <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />} />
        <Route path="/" element={<Home />} />
        
        <Route path="/player/:id" element={isAuthenticated ? <Player /> : <Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
};

export default App;
