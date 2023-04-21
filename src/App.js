import axios from "axios";
import react, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginSignUpPage from "./pages/LoginSignupPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/" element={<LoginSignUpPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
