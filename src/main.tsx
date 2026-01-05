import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./styles/globals.css";


// Pages
import Home from "./pages/Home";
import TryOn from "./pages/TryOn";
import Wardrobe from "./pages/Wardrobe";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="tryon" element={<TryOn />} />
          <Route path="wardrobe" element={<Wardrobe />} />
          <Route path="profile" element={<Profile />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="signup" element={<Signup />} /> {/* ✅ ADD THIS */}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
